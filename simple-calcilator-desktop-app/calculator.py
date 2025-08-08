import tkinter as tk
from tkinter import ttk
import math

class Calculator:
    def __init__(self):
        self.root = tk.Tk()
        self.setup_window()
        self.setup_variables()
        self.create_widgets()
        
    def setup_window(self):
        self.root.title("Simple Calculator")
        self.root.geometry("380x620")
        self.root.resizable(False, False)
        self.root.configure(bg='#000000')
        
        # Center the window on screen
        self.root.update_idletasks()
        x = (self.root.winfo_screenwidth() // 2) - (420 // 2)
        y = (self.root.winfo_screenheight() // 2) - (720 // 2)
        self.root.geometry(f"420x720+{x}+{y}")

    def setup_variables(self):
        self.display = "0"
        self.previous_value = None
        self.operation = None
        self.waiting_for_operand = False
        self.expression = ""
        
    def create_widgets(self):
        # Main frame with better padding
        main_frame = tk.Frame(self.root, bg='#000000', padx=25, pady=25)
        main_frame.pack(fill=tk.BOTH, expand=True)
        
        # Title with better spacing
        title_label = tk.Label(
            main_frame, 
            text="Simple Calculator",
            font=("Segoe UI", 20, "bold"),
            fg="white",
            bg="#000000"
        )
        title_label.pack(pady=(0, 25))
        
        # Display frame with rounded corners effect
        display_outer_frame = tk.Frame(
            main_frame,
            bg="#374151",
            relief=tk.FLAT,
            bd=0,
            height=100
        )
        display_outer_frame.pack(fill=tk.X, pady=(0, 25))
        display_outer_frame.pack_propagate(False)
        
        # Inner display frame for padding
        display_frame = tk.Frame(
            display_outer_frame,
            bg="#374151"
        )
        display_frame.pack(fill=tk.BOTH, expand=True, padx=20, pady=15)
        
        # Expression display (top line)
        self.expression_var = tk.StringVar()
        self.expression_label = tk.Label(
            display_frame,
            textvariable=self.expression_var,
            font=("Segoe UI", 12),
            fg="#d1d5db",
            bg="#374151",
            anchor="e",
            justify="right",
            height=1
        )
        self.expression_label.pack(fill=tk.X, side=tk.TOP)
        
        # Main display (bottom line)
        self.display_var = tk.StringVar(value="0")
        self.display_label = tk.Label(
            display_frame,
            textvariable=self.display_var,
            font=("Segoe UI", 28, "normal"),
            fg="white",
            bg="#374151",
            anchor="e",
            justify="right",
            height=1
        )
        self.display_label.pack(fill=tk.BOTH, expand=True, side=tk.BOTTOM)
        
        # Buttons frame with proper spacing
        buttons_frame = tk.Frame(main_frame, bg='#000000')
        buttons_frame.pack(expand=True)
        
        # Button configuration - more refined
        button_config = {
            'width': 70,
            'height': 70,
            'font': ('Segoe UI', 16, 'normal'),
            'relief': tk.FLAT,
            'bd': 0,
            'cursor': 'hand2',
            'compound': tk.CENTER
        }
        
        # Create buttons grid with Canvas for circular effect
        buttons = [
            # Row 1
            [('C', 'clear'), ('+/−', 'toggle_sign'), ('%', 'percentage'), ('÷', 'divide')],
            # Row 2
            [('7', '7'), ('8', '8'), ('9', '9'), ('×', 'multiply')],
            # Row 3
            [('4', '4'), ('5', '5'), ('6', '6'), ('−', 'subtract')],
            # Row 4
            [('1', '1'), ('2', '2'), ('3', '3'), ('+', 'add')],
            # Row 5
            [('.', 'decimal'), ('0', '0'), ('⌫', 'backspace'), ('=', 'equals')]
        ]
        
        # Create button frames for circular appearance
        for row_idx, row in enumerate(buttons):
            for col_idx, (text, action) in enumerate(row):
                # Button container for circular effect
                btn_frame = tk.Frame(
                    buttons_frame,
                    bg='#000000',
                    width=75,
                    height=75
                )
                btn_frame.grid(row=row_idx, column=col_idx, padx=6, pady=6)
                btn_frame.pack_propagate(False)
                
                # Determine button color
                if action in ['add', 'subtract', 'multiply', 'divide', 'equals']:
                    bg_color = '#f59e0b'  # Orange for operators
                    hover_color = '#fbbf24'
                elif action == 'clear':
                    bg_color = '#ef4444'  # Red for clear
                    hover_color = '#f87171'
                else:
                    bg_color = '#4b5563'  # Gray for numbers and functions
                    hover_color = '#6b7280'
                
                # Create circular button using Canvas
                canvas = tk.Canvas(
                    btn_frame,
                    width=70,
                    height=70,
                    bg='#000000',
                    highlightthickness=0
                )
                canvas.pack(expand=True)
                
                # Draw circle
                circle = canvas.create_oval(3, 3, 67, 67, fill=bg_color, outline=bg_color, width=0)
                
                # Add text
                text_item = canvas.create_text(35, 35, text=text, fill='white', 
                                             font=('Segoe UI', 16, 'normal'))
                
                # Bind events for functionality and hover effects
                def on_click(event, a=action):
                    self.button_click(a)
                
                def on_enter(event, c=canvas, circ=circle, hover=hover_color):
                    c.itemconfig(circ, fill=hover, outline=hover)
                
                def on_leave(event, c=canvas, circ=circle, orig=bg_color):
                    c.itemconfig(circ, fill=orig, outline=orig)
                
                canvas.bind("<Button-1>", on_click)
                canvas.bind("<Enter>", on_enter)
                canvas.bind("<Leave>", on_leave)
                
                # Make text clickable too
                canvas.tag_bind(text_item, "<Button-1>", on_click)
                canvas.tag_bind(circle, "<Button-1>", on_click)
    
    def button_click(self, action):
        if action.isdigit():
            self.input_number(int(action))
        elif action == 'decimal':
            self.input_decimal()
        elif action == 'clear':
            self.clear()
        elif action == 'backspace':
            self.backspace()
        elif action == 'toggle_sign':
            self.toggle_sign()
        elif action == 'percentage':
            self.percentage()
        elif action in ['add', 'subtract', 'multiply', 'divide']:
            operation_map = {
                'add': '+',
                'subtract': '−',
                'multiply': '×',
                'divide': '÷'
            }
            self.input_operation(operation_map[action])
        elif action == 'equals':
            self.perform_calculation()
    
    def input_number(self, num):
        if self.waiting_for_operand:
            self.display = str(num)
            self.waiting_for_operand = False
        else:
            self.display = str(num) if self.display == '0' else self.display + str(num)
        self.update_display()
    
    def input_decimal(self):
        if self.waiting_for_operand:
            self.display = '0.'
            self.waiting_for_operand = False
        elif '.' not in self.display:
            self.display += '.'
        self.update_display()
    
    def input_operation(self, next_operation):
        input_value = float(self.display)
        
        if self.previous_value is None:
            self.previous_value = input_value
            self.expression = f"{self.display} {next_operation} "
        elif self.operation and not self.waiting_for_operand:
            current_value = self.previous_value or 0
            new_value = self.calculate(current_value, input_value, self.operation)
            self.display = str(new_value)
            self.previous_value = new_value
            self.expression = f"{new_value} {next_operation} "
        else:
            self.expression = f"{self.display} {next_operation} "
            self.previous_value = input_value
        
        self.waiting_for_operand = True
        self.operation = next_operation
        self.update_display()
    
    def calculate(self, first_value, second_value, operation):
        try:
            if operation == '+':
                return first_value + second_value
            elif operation == '−':
                return first_value - second_value
            elif operation == '×':
                return first_value * second_value
            elif operation == '÷':
                return first_value / second_value if second_value != 0 else 0
        except:
            return 0
    
    def perform_calculation(self):
        input_value = float(self.display)
        
        if self.previous_value is not None and self.operation:
            new_value = self.calculate(self.previous_value, input_value, self.operation)
            
            # Handle floating point precision
            if isinstance(new_value, float):
                if new_value == int(new_value):
                    new_value = int(new_value)
                else:
                    new_value = round(new_value, 8)
            
            self.expression = f"{self.expression}{self.display}"
            self.display = str(new_value)
            self.previous_value = None
            self.operation = None
            self.waiting_for_operand = True
            self.update_display()
    
    def clear(self):
        self.display = '0'
        self.previous_value = None
        self.operation = None
        self.waiting_for_operand = False
        self.expression = ""
        self.update_display()
    
    def backspace(self):
        if len(self.display) > 1:
            self.display = self.display[:-1]
        else:
            self.display = '0'
        self.update_display()
    
    def toggle_sign(self):
        if self.display != '0':
            if self.display.startswith('-'):
                self.display = self.display[1:]
            else:
                self.display = '-' + self.display
            self.update_display()
    
    def percentage(self):
        value = float(self.display)
        result = value / 100
        self.display = str(result)
        self.update_display()
    
    def update_display(self):
        self.display_var.set(self.display)
        self.expression_var.set(self.expression)
    
    def run(self):
        self.root.mainloop()

# Create and run the calculator
if __name__ == "__main__":
    calculator = Calculator()
    calculator.run()