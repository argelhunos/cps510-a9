-- Departments
INSERT INTO Department (DepartmentID, DepartmentName, NumberOfEmployees) VALUES (1, 'Human Resources', 2);
INSERT INTO Department (DepartmentID, DepartmentName, NumberOfEmployees) VALUES (2, 'Engineering', 3);
INSERT INTO Department (DepartmentID, DepartmentName, NumberOfEmployees) VALUES (3, 'Finance', 1);


-- Job Positions
INSERT INTO JobPosition (JobPositionID, JobPositionTitle) VALUES (1, 'HR Manager');
INSERT INTO JobPosition (JobPositionID, JobPositionTitle) VALUES (2, 'Software Engineer');
INSERT INTO JobPosition (JobPositionID, JobPositionTitle) VALUES (3, 'Senior Software Engineer');
INSERT INTO JobPosition (JobPositionID, JobPositionTitle) VALUES (4, 'Accountant');
INSERT INTO JobPosition (JobPositionID, JobPositionTitle) VALUES (5, 'Intern');

-- Employees
INSERT INTO Employee (EmployeeID, FirstName, LastName, Email, StreetNumber, StreetName, City, ArrivalDate, PhoneNumber, DateOfBirth, DepartmentID, JobPositionID, WageJobPosition, IsManager) 
VALUES (101, 'Alice', 'Brown', 'alice.brown@company.com', 12, 'Maple Street', 'Toronto', TO_DATE('2020-05-12','YYYY-MM-DD'), '4161111111', TO_DATE('1990-03-15','YYYY-MM-DD'), 1, 1, 'Salary', 'Yes');

INSERT INTO Employee (EmployeeID, FirstName, LastName, Email, StreetNumber, StreetName, City, ArrivalDate, PhoneNumber, DateOfBirth, DepartmentID, JobPositionID, WageJobPosition, IsManager) 
VALUES (102, 'Bob', 'Smith', 'bob.smith@company.com', 34, 'Oak Avenue', 'Toronto', TO_DATE('2021-03-01','YYYY-MM-DD'), '4162222222', TO_DATE('1995-06-20','YYYY-MM-DD'), 2, 2, 'Hourly', 'No');

INSERT INTO Employee (EmployeeID, FirstName, LastName, Email, StreetNumber, StreetName, City, ArrivalDate, PhoneNumber, DateOfBirth, DepartmentID, JobPositionID, WageJobPosition, IsManager) 
VALUES (103, 'Charlie', 'Davis', 'charlie.davis@company.com', 56, 'Pine Road', 'Toronto', TO_DATE('2022-07-10','YYYY-MM-DD'), '4163333333', TO_DATE('1992-11-05','YYYY-MM-DD'), 2, 3, 'Salary', 'Yes');

INSERT INTO Employee (EmployeeID, FirstName, LastName, Email, StreetNumber, StreetName, City, ArrivalDate, PhoneNumber, DateOfBirth, DepartmentID, JobPositionID, WageJobPosition, IsManager) 
VALUES (104, 'Diana', 'Lopez', 'diana.lopez@company.com', 78, 'Birch Blvd', 'Toronto', TO_DATE('2021-09-15','YYYY-MM-DD'), '4164444444', TO_DATE('1998-01-12','YYYY-MM-DD'), 2, 5, 'Hourly', 'No');

INSERT INTO Employee (EmployeeID, FirstName, LastName, Email, StreetNumber, StreetName, City, ArrivalDate, PhoneNumber, DateOfBirth, DepartmentID, JobPositionID, WageJobPosition, IsManager) 
VALUES (105, 'Edward', 'Clark', 'edward.clark@company.com', 90, 'Cedar Lane', 'Toronto', TO_DATE('2019-02-25','YYYY-MM-DD'), '4165555555', TO_DATE('1987-08-23','YYYY-MM-DD'), 3, 4, 'Salary', 'Yes');

INSERT INTO Employee (EmployeeID, FirstName, LastName, Email, StreetNumber, StreetName, City, ArrivalDate, PhoneNumber, DateOfBirth, DepartmentID, JobPositionID, WageJobPosition, IsManager) 
VALUES (106, 'Fiona', 'Wong', 'fiona.wong@company.com', 23, 'Elm Street', 'Toronto', TO_DATE('2023-04-05','YYYY-MM-DD'), '4166666666', TO_DATE('2000-12-02','YYYY-MM-DD'), 1, 5, 'Hourly', 'No');

-- Hourly Employees
INSERT INTO HourlyEmployee (EmployeeID, HourlyRate, OvertimeRate) VALUES (102, 40, 60);
INSERT INTO HourlyEmployee (EmployeeID, HourlyRate, OvertimeRate) VALUES (104, 20, 30);
INSERT INTO HourlyEmployee (EmployeeID, HourlyRate, OvertimeRate) VALUES (106, 18, 27);

-- Salaried Employees
INSERT INTO SalariedEmployee (EmployeeID, AnnualSalary) VALUES (101, 70000);
INSERT INTO SalariedEmployee (EmployeeID, AnnualSalary) VALUES (103, 95000);
INSERT INTO SalariedEmployee (EmployeeID, AnnualSalary) VALUES (105, 80000);

-- Deductions
INSERT INTO Deductions (EmployeeID, DeductionType, IsActive, Percentage) VALUES (101, 'Income Tax', 'Yes', 13);
INSERT INTO Deductions (EmployeeID, DeductionType, IsActive, Percentage) VALUES (101, 'Health Insurance', 'Yes', 5);
INSERT INTO Deductions (EmployeeID, DeductionType, IsActive, Percentage) VALUES (101, 'Retirement Plan', 'Yes', 3);

INSERT INTO Deductions (EmployeeID, DeductionType, IsActive, Percentage) VALUES (102, 'Income Tax', 'Yes', 13);
INSERT INTO Deductions (EmployeeID, DeductionType, IsActive, Percentage) VALUES (102, 'Health Insurance', 'Yes', 4);
INSERT INTO Deductions (EmployeeID, DeductionType, IsActive, Percentage) VALUES (102, 'Retirement Plan', 'Yes', 2);

INSERT INTO Deductions (EmployeeID, DeductionType, IsActive, Percentage) VALUES (103, 'Income Tax', 'Yes', 13);
INSERT INTO Deductions (EmployeeID, DeductionType, IsActive, Percentage) VALUES (103, 'Health Insurance', 'Yes', 6);
INSERT INTO Deductions (EmployeeID, DeductionType, IsActive, Percentage) VALUES (103, 'Retirement Plan', 'Yes', 4);

INSERT INTO Deductions (EmployeeID, DeductionType, IsActive, Percentage) VALUES (104, 'Income Tax', 'Yes', 13);
INSERT INTO Deductions (EmployeeID, DeductionType, IsActive, Percentage) VALUES (104, 'Health Insurance', 'Yes', 3);
INSERT INTO Deductions (EmployeeID, DeductionType, IsActive, Percentage) VALUES (104, 'Retirement Plan', 'Yes', 2);

INSERT INTO Deductions (EmployeeID, DeductionType, IsActive, Percentage) VALUES (105, 'Income Tax', 'Yes', 13);
INSERT INTO Deductions (EmployeeID, DeductionType, IsActive, Percentage) VALUES (105, 'Health Insurance', 'Yes', 5);
INSERT INTO Deductions (EmployeeID, DeductionType, IsActive, Percentage) VALUES (105, 'Retirement Plan', 'Yes', 3);

INSERT INTO Deductions (EmployeeID, DeductionType, IsActive, Percentage) VALUES (106, 'Income Tax', 'Yes', 13);
INSERT INTO Deductions (EmployeeID, DeductionType, IsActive, Percentage) VALUES (106, 'Health Insurance', 'Yes', 4);
INSERT INTO Deductions (EmployeeID, DeductionType, IsActive, Percentage) VALUES (106, 'Retirement Plan', 'Yes', 2);

--Payroll
INSERT INTO Payroll (PayrollID, EmployeeID, PeriodStart, PeriodEnd, BasePayment, OvertimeHour, OvertimePay, GrossPayment, NetPayment) 
VALUES (1001, 101, DATE '2023-08-01', DATE '2023-08-31', 5833.33, 0, 0.0, 5833.33, 4666.66);

INSERT INTO Payroll (PayrollID, EmployeeID, PeriodStart, PeriodEnd, BasePayment, OvertimeHour, OvertimePay, GrossPayment, NetPayment) 
VALUES (1002, 102, DATE '2023-08-01', DATE '2023-08-31', 6400, 10, 600, 7000, 5950);

INSERT INTO Payroll (PayrollID, EmployeeID, PeriodStart, PeriodEnd, BasePayment, OvertimeHour, OvertimePay, GrossPayment, NetPayment) 
VALUES (1003, 103, DATE '2023-08-01', DATE '2023-08-31', 7916.67, 0, 0.0, 7916.67, 6175);

INSERT INTO Payroll (PayrollID, EmployeeID, PeriodStart, PeriodEnd, BasePayment, OvertimeHour, OvertimePay, GrossPayment, NetPayment) 
VALUES (1004, 104, DATE '2023-08-01', DATE '2023-08-31', 3200, 5, 150, 3350, 3015);

INSERT INTO Payroll (PayrollID, EmployeeID, PeriodStart, PeriodEnd, BasePayment, OvertimeHour, OvertimePay, GrossPayment, NetPayment) 
VALUES (1005, 105, DATE '2023-08-01', DATE '2023-08-31', 6666.67, 0, 0.0, 6666.67, 5466.67);

INSERT INTO Payroll (PayrollID, EmployeeID, PeriodStart, PeriodEnd, BasePayment, OvertimeHour, OvertimePay, GrossPayment, NetPayment) 
VALUES (1006, 106, DATE '2023-08-01', DATE '2023-08-31', 2880, 8, 216, 3096, 2724.48);

-- Attendance
INSERT INTO Attendance (EmployeeID, DateWorked, ClockIn, ClockOut, HoursWorked, OvertimeHours) 
VALUES (102, TO_DATE('2023-08-10','YYYY-MM-DD'), TO_DATE('2023-08-10 09:00:00','YYYY-MM-DD HH24:MI:SS'), TO_DATE('2023-08-10 18:00:00','YYYY-MM-DD HH24:MI:SS'), 8, 1);

INSERT INTO Attendance (EmployeeID, DateWorked, ClockIn, ClockOut, HoursWorked, OvertimeHours) 
VALUES (104, TO_DATE('2023-08-10','YYYY-MM-DD'), TO_DATE('2023-08-10 09:30:00','YYYY-MM-DD HH24:MI:SS'), TO_DATE('2023-08-10 17:30:00','YYYY-MM-DD HH24:MI:SS'), 7, 0);

INSERT INTO Attendance (EmployeeID, DateWorked, ClockIn, ClockOut, HoursWorked, OvertimeHours) 
VALUES (106, TO_DATE('2023-08-10','YYYY-MM-DD'), TO_DATE('2023-08-10 10:00:00','YYYY-MM-DD HH24:MI:SS'), TO_DATE('2023-08-10 19:00:00','YYYY-MM-DD HH24:MI:SS'), 8, 1);

-- Bonuses
INSERT INTO Bonus (EmployeeID, BonusType, Amount, DateGranted) VALUES (101, 'Performance', 2000, TO_DATE('2023-07-15','YYYY-MM-DD'));
INSERT INTO Bonus (EmployeeID, BonusType, Amount, DateGranted) VALUES (103, 'Retention', 3000, TO_DATE('2023-06-20','YYYY-MM-DD'));
INSERT INTO Bonus (EmployeeID, BonusType, Amount, DateGranted) VALUES (105, 'Holiday', 1000, TO_DATE('2022-12-25','YYYY-MM-DD'));


-- PayrollDeductionHistory
INSERT INTO PayrollDeductionHistory (PayrollID, DeductionType, Amount) VALUES (1001, 'Income Tax', 5000 * 0.20);
INSERT INTO PayrollDeductionHistory (PayrollID, DeductionType, Amount) VALUES (1001, 'Health Insurance', 200);
INSERT INTO PayrollDeductionHistory (PayrollID, DeductionType, Amount) VALUES (1001, 'Retirement Plan', 5000 * 0.02);

INSERT INTO PayrollDeductionHistory (PayrollID, DeductionType, Amount) VALUES (1002, 'Income Tax', 4500 * 0.20);
INSERT INTO PayrollDeductionHistory (PayrollID, DeductionType, Amount) VALUES (1002, 'Health Insurance', 200);
INSERT INTO PayrollDeductionHistory (PayrollID, DeductionType, Amount) VALUES (1002, 'Retirement Plan', 4500 * 0.02);

INSERT INTO PayrollDeductionHistory (PayrollID, DeductionType, Amount) VALUES (1003, 'Income Tax', 6000 * 0.20);
INSERT INTO PayrollDeductionHistory (PayrollID, DeductionType, Amount) VALUES (1003, 'Health Insurance', 200);
INSERT INTO PayrollDeductionHistory (PayrollID, DeductionType, Amount) VALUES (1003, 'Retirement Plan', 6000 * 0.02);

INSERT INTO PayrollDeductionHistory (PayrollID, DeductionType, Amount) VALUES (1004, 'Income Tax', 5500 * 0.20);
INSERT INTO PayrollDeductionHistory (PayrollID, DeductionType, Amount) VALUES (1004, 'Health Insurance', 200);
INSERT INTO PayrollDeductionHistory (PayrollID, DeductionType, Amount) VALUES (1004, 'Retirement Plan', 5500 * 0.02);

INSERT INTO PayrollDeductionHistory (PayrollID, DeductionType, Amount) VALUES (1005, 'Income Tax', 4000 * 0.20);
INSERT INTO PayrollDeductionHistory (PayrollID, DeductionType, Amount) VALUES (1005, 'Health Insurance', 200);
INSERT INTO PayrollDeductionHistory (PayrollID, DeductionType, Amount) VALUES (1005, 'Retirement Plan', 4000 * 0.02);

INSERT INTO PayrollDeductionHistory (PayrollID, DeductionType, Amount) VALUES (1006, 'Income Tax', 3096 * 0.20);
INSERT INTO PayrollDeductionHistory (PayrollID, DeductionType, Amount) VALUES (1006, 'Health Insurance', 200);
INSERT INTO PayrollDeductionHistory (PayrollID, DeductionType, Amount) VALUES (1006, 'Retirement Plan', 3096 * 0.02);