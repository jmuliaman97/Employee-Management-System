USE employees_db;

INSERT INTO department (name)
VALUES ('Sales'), ('Engineering'), ('Finance'), ('Legal');

INSERT INTO roles (title, salary, department_id) 
VALUES ('Sales Lead', 100000.00, 1), ('Salesperson', 80000.00, 1), ('Lead Engineer', 150000.00, 2), ('Software Engineer', 120000.00, 2), ('Account Manager', 145000.00, 3), ('Accountant', 125000.00, 3), ('Legal Team Lead', 250000.00, 4), ('Lawyer', 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Jordan', 'Muliaman', 1, NULL), ('Elizabeth', 'Djaja', 2, 1), ('Henry', 'Sulistio', 3, NULL), ('Sheila', 'Liang', 4, 3), ('Ryan', 'Huang', 5, NULL), ('Calvin', 'Njoto', 6, 5), ('Claudia', 'Soehada', 7, NULL), ('Aaron', 'Widjaja', 8, 7), ('Vito', 'Hamzar', 9, NULL), ('Herdinand', 'Hercules', 10, 9), ('Cliff', 'Bryan', 11, NULL), ('Cindry', 'Tjuarsa', 12, 11);