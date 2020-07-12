use employees_DB;

INSERT INTO department (name) VALUES
("Accounting"),
("Legal"),
("IT"),
("Sales");

INSERT INTO role (title, salary, department_id) VALUES
("Sales Lead", 75000, 4),
("Salesperson", 50000, 4),
("Lead Engineer", 120000, 3),
("Software Engineer", 90000, 3),
("Senior Accountant", 85000, 1),
("Accountant", 50000, 1),
("Legal Lead", 125000, 2),
("Lawyer", 95000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
("Jim", "Davis", 1, null),
("Tony", "Perrera", 2, 1),
("Gabriella", "Farrington", 5, null), 
("Tommy", "Bull", 8, null),
("Eduard", "Ferguson", 3, null), 
("Atlas", "Weir", 4, 5),
("Hibah", "Cooke", 4, 5),
("Shirley", "Dodson", 6, 3);
