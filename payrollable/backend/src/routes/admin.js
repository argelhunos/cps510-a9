const express = require('express');
const oracledb = require('oracledb');
const oracle = require("../db/oracle");
const fs = require("fs");
const router = express.Router();

const statements = [
  //0 - 16
  `BEGIN EXECUTE IMMEDIATE 'DROP TABLE Bonus'; EXCEPTION WHEN OTHERS THEN IF SQLCODE != -942 THEN RAISE; END IF; END;`,
  `BEGIN EXECUTE IMMEDIATE 'DROP TABLE Attendance'; EXCEPTION WHEN OTHERS THEN IF SQLCODE != -942 THEN RAISE; END IF; END;`,
  `BEGIN EXECUTE IMMEDIATE 'DROP TABLE PayrollDeductionHistory'; EXCEPTION WHEN OTHERS THEN IF SQLCODE != -942 THEN RAISE; END IF; END;`,
  `BEGIN EXECUTE IMMEDIATE 'DROP TABLE Payroll'; EXCEPTION WHEN OTHERS THEN IF SQLCODE != -942 THEN RAISE; END IF; END;`,
  `BEGIN EXECUTE IMMEDIATE 'DROP TABLE GrossPayCalculation'; EXCEPTION WHEN OTHERS THEN IF SQLCODE != -942 THEN RAISE; END IF; END;`,
  `BEGIN EXECUTE IMMEDIATE 'DROP TABLE Deductions'; EXCEPTION WHEN OTHERS THEN IF SQLCODE != -942 THEN RAISE; END IF; END;`,
  `BEGIN EXECUTE IMMEDIATE 'DROP TABLE SalariedEmployee'; EXCEPTION WHEN OTHERS THEN IF SQLCODE != -942 THEN RAISE; END IF; END;`,
  `BEGIN EXECUTE IMMEDIATE 'DROP TABLE HourlyEmployee'; EXCEPTION WHEN OTHERS THEN IF SQLCODE != -942 THEN RAISE; END IF; END;`,
  `BEGIN EXECUTE IMMEDIATE 'DROP TABLE Employee'; EXCEPTION WHEN OTHERS THEN IF SQLCODE != -942 THEN RAISE; END IF; END;`,
  `BEGIN EXECUTE IMMEDIATE 'DROP TABLE Department'; EXCEPTION WHEN OTHERS THEN IF SQLCODE != -942 THEN RAISE; END IF; END;`,
  `BEGIN EXECUTE IMMEDIATE 'DROP TABLE DepartmentManager'; EXCEPTION WHEN OTHERS THEN IF SQLCODE != -942 THEN RAISE; END IF; END;`,
  `BEGIN EXECUTE IMMEDIATE 'DROP TABLE JobPosition'; EXCEPTION WHEN OTHERS THEN IF SQLCODE != -942 THEN RAISE; END IF; END;`,
  `BEGIN EXECUTE IMMEDIATE 'DROP VIEW ActiveDeductions'; EXCEPTION WHEN OTHERS THEN IF SQLCODE != -942 THEN RAISE; END IF; END;`,
  `BEGIN EXECUTE IMMEDIATE 'DROP VIEW FullEmployeeProfile'; EXCEPTION WHEN OTHERS THEN IF SQLCODE != -942 THEN RAISE; END IF; END;`,
  `BEGIN EXECUTE IMMEDIATE 'DROP VIEW DepartmentPayrollSummary'; EXCEPTION WHEN OTHERS THEN IF SQLCODE != -942 THEN RAISE; END IF; END;`,
  `BEGIN EXECUTE IMMEDIATE 'DROP SEQUENCE Payroll_SEQ'; EXCEPTION WHEN OTHERS THEN IF SQLCODE != -2289 THEN RAISE; END IF; END;`,

  //16 - 29
  `CREATE TABLE Department (
      DepartmentID INT PRIMARY KEY,
      DepartmentName VARCHAR2(100) NOT NULL,
      NumberOfEmployees INT NOT NULL
  )`,

  `CREATE TABLE DepartmentManager (
      ManagerID INT PRIMARY KEY,
      DepartmentName VARCHAR2(100) NOT NULL
  )`,

  `CREATE TABLE JobPosition (
      JobPositionID INT PRIMARY KEY,
      JobPositionTitle VARCHAR2(100) NOT NULL
  )`,

  `CREATE TABLE Employee (
      EmployeeID INT PRIMARY KEY,
      FirstName VARCHAR2(50) NOT NULL,
      LastName VARCHAR2(50) NOT NULL,
      Email VARCHAR2(100) NOT NULL,
      StreetNumber INT NOT NULL,
      StreetName VARCHAR2(100) NOT NULL,
      City VARCHAR2(100) NOT NULL,
      ArrivalDate DATE NOT NULL,
      PhoneNumber VARCHAR2(15) NOT NULL,
      DateOfBirth DATE NOT NULL,
      DepartmentID INT NOT NULL,
      JobPositionID INT NOT NULL,
      WageJobPosition VARCHAR2(20) NOT NULL CHECK (WageJobPosition IN ('Hourly','Salary')),
      IsManager VARCHAR2(3) NOT NULL CHECK (IsManager IN ('Yes','No')),
      FOREIGN KEY (DepartmentID) REFERENCES Department(DepartmentID),
      FOREIGN KEY (JobPositionID) REFERENCES JobPosition(JobPositionID)
  )`,

  `CREATE TABLE HourlyEmployee (
      EmployeeID INT PRIMARY KEY,
      HourlyRate NUMBER(8,2) NOT NULL,
      OvertimeRate NUMBER(8,2) NOT NULL,
      FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID)
  )`,

  `CREATE TABLE SalariedEmployee (
      EmployeeID INT PRIMARY KEY,
      AnnualSalary NUMBER(10,2) NOT NULL,
      FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID)
  )`,

  `CREATE TABLE Deductions (
      EmployeeID INT NOT NULL,
      DeductionType VARCHAR2(100) NOT NULL,
      IsActive VARCHAR2(3) NOT NULL CHECK (IsActive IN ('Yes','No')),
      Percentage NUMBER(5,2) NOT NULL,
      PRIMARY KEY (EmployeeID, DeductionType),
      FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID)
  )`,

  `CREATE TABLE Payroll (
      PayrollID INT PRIMARY KEY,
      EmployeeID INT NOT NULL,
      PeriodStart DATE NOT NULL,
      PeriodEnd DATE NOT NULL,
      BasePayment NUMBER(10,2) NOT NULL,
      OvertimeHour NUMBER(5,2) DEFAULT 0 NOT NULL,
      OvertimePay NUMBER(10,2) DEFAULT 0 NOT NULL,
      NetPayment NUMBER(10,2) NOT NULL,
      FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID)
  )`,

  `CREATE TABLE GrossPayCalculation (
      BasePayment NUMBER(10,2) NOT NULL,
      OvertimeHour NUMBER(5,2) DEFAULT 0 NOT NULL,
      OvertimePay NUMBER(10,2) DEFAULT 0 NOT NULL,
      GrossPayment NUMBER(10,2) NOT NULL,
      PRIMARY KEY (BasePayment, OvertimeHour, OvertimePay)
  )`,

  `CREATE TABLE PayrollDeductionHistory (
      PayrollID INT NOT NULL,
      DeductionType VARCHAR2(100) NOT NULL,
      Amount NUMBER(10,2) NOT NULL,
      PRIMARY KEY (PayrollID, DeductionType),
      FOREIGN KEY (PayrollID) REFERENCES Payroll(PayrollID)
  )`,

  `CREATE TABLE Attendance (
      EmployeeID INT NOT NULL,
      DateWorked DATE NOT NULL,
      ClockIn TIMESTAMP NOT NULL,
      ClockOut TIMESTAMP NOT NULL,
      HoursWorked NUMBER(5,2) NOT NULL,
      OvertimeHours NUMBER(5,2) DEFAULT 0 NOT NULL,
      PRIMARY KEY (EmployeeID, DateWorked, ClockIn),
      FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID)
  )`,

  `CREATE TABLE Bonus (
      EmployeeID INT NOT NULL,
      BonusType VARCHAR2(50) NOT NULL,
      Amount NUMBER(10,2) NOT NULL,
      DateGranted DATE NOT NULL,
      PRIMARY KEY (EmployeeID, BonusType, DateGranted),
      FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID)
  )`,

  `-- Create a Payroll Sequence to generate unique PayrollID values
  CREATE SEQUENCE Payroll_SEQ
      START WITH 1
      INCREMENT BY 1
      NOCACHE
      NOCYCLE`,


  //29 - 106
  `INSERT INTO Department (DepartmentID, DepartmentName, NumberOfEmployees) VALUES (1, 'Human Resources', 2)`,
  `INSERT INTO Department (DepartmentID, DepartmentName, NumberOfEmployees) VALUES (2, 'Engineering', 3)`,
  `INSERT INTO Department (DepartmentID, DepartmentName, NumberOfEmployees) VALUES (3, 'Finance', 1)`,

  `INSERT INTO DepartmentManager (ManagerID, DepartmentName) VALUES (101, 'Human Resources')`,
  `INSERT INTO DepartmentManager (ManagerID, DepartmentName) VALUES (103, 'Engineering')`,
  `INSERT INTO DepartmentManager (ManagerID, DepartmentName) VALUES (105, 'Finance')`,

  `INSERT INTO JobPosition (JobPositionID, JobPositionTitle) VALUES (1, 'HR Manager')`,
  `INSERT INTO JobPosition (JobPositionID, JobPositionTitle) VALUES (2, 'Software Engineer')`,
  `INSERT INTO JobPosition (JobPositionID, JobPositionTitle) VALUES (3, 'Senior Software Engineer')`,
  `INSERT INTO JobPosition (JobPositionID, JobPositionTitle) VALUES (4, 'Accountant')`,
  `INSERT INTO JobPosition (JobPositionID, JobPositionTitle) VALUES (5, 'Intern')`,

  `INSERT INTO Employee (EmployeeID, FirstName, LastName, Email, StreetNumber, StreetName, City, ArrivalDate, PhoneNumber, DateOfBirth, DepartmentID, JobPositionID, WageJobPosition, IsManager) 
  VALUES (101, 'Alice', 'Brown', 'alice.brown@company.com', 12, 'Maple Street', 'Toronto', TO_DATE('2020-05-12','YYYY-MM-DD'), '4161111111', TO_DATE('1990-03-15','YYYY-MM-DD'), 1, 1, 'Salary', 'Yes')`,

  `INSERT INTO Employee (EmployeeID, FirstName, LastName, Email, StreetNumber, StreetName, City, ArrivalDate, PhoneNumber, DateOfBirth, DepartmentID, JobPositionID, WageJobPosition, IsManager) 
  VALUES (102, 'Bob', 'Smith', 'bob.smith@company.com', 34, 'Oak Avenue', 'Toronto', TO_DATE('2021-03-01','YYYY-MM-DD'), '4162222222', TO_DATE('1995-06-20','YYYY-MM-DD'), 2, 2, 'Hourly', 'No')`,

  `INSERT INTO Employee (EmployeeID, FirstName, LastName, Email, StreetNumber, StreetName, City, ArrivalDate, PhoneNumber, DateOfBirth, DepartmentID, JobPositionID, WageJobPosition, IsManager) 
  VALUES (103, 'Charlie', 'Davis', 'charlie.davis@company.com', 56, 'Pine Road', 'Toronto', TO_DATE('2022-07-10','YYYY-MM-DD'), '4163333333', TO_DATE('1992-11-05','YYYY-MM-DD'), 2, 3, 'Salary', 'Yes')`,

  `INSERT INTO Employee (EmployeeID, FirstName, LastName, Email, StreetNumber, StreetName, City, ArrivalDate, PhoneNumber, DateOfBirth, DepartmentID, JobPositionID, WageJobPosition, IsManager) 
  VALUES (104, 'Diana', 'Lopez', 'diana.lopez@company.com', 78, 'Birch Blvd', 'Toronto', TO_DATE('2021-09-15','YYYY-MM-DD'), '4164444444', TO_DATE('1998-01-12','YYYY-MM-DD'), 2, 5, 'Hourly', 'No')`,

  `INSERT INTO Employee (EmployeeID, FirstName, LastName, Email, StreetNumber, StreetName, City, ArrivalDate, PhoneNumber, DateOfBirth, DepartmentID, JobPositionID, WageJobPosition, IsManager) 
  VALUES (105, 'Edward', 'Clark', 'edward.clark@company.com', 90, 'Cedar Lane', 'Toronto', TO_DATE('2019-02-25','YYYY-MM-DD'), '4165555555', TO_DATE('1987-08-23','YYYY-MM-DD'), 3, 4, 'Salary', 'Yes')`,

  `INSERT INTO Employee (EmployeeID, FirstName, LastName, Email, StreetNumber, StreetName, City, ArrivalDate, PhoneNumber, DateOfBirth, DepartmentID, JobPositionID, WageJobPosition, IsManager) 
  VALUES (106, 'Fiona', 'Wong', 'fiona.wong@company.com', 23, 'Elm Street', 'Toronto', TO_DATE('2023-04-05','YYYY-MM-DD'), '4166666666', TO_DATE('2000-12-02','YYYY-MM-DD'), 1, 5, 'Hourly', 'No')`,

  `INSERT INTO HourlyEmployee (EmployeeID, HourlyRate, OvertimeRate) VALUES (102, 40, 60)`,
  `INSERT INTO HourlyEmployee (EmployeeID, HourlyRate, OvertimeRate) VALUES (104, 20, 30)`,
  `INSERT INTO HourlyEmployee (EmployeeID, HourlyRate, OvertimeRate) VALUES (106, 18, 27)`,

  `INSERT INTO SalariedEmployee (EmployeeID, AnnualSalary) VALUES (101, 70000)`,
  `INSERT INTO SalariedEmployee (EmployeeID, AnnualSalary) VALUES (103, 95000)`,
  `INSERT INTO SalariedEmployee (EmployeeID, AnnualSalary) VALUES (105, 80000)`,

  `INSERT INTO Deductions (EmployeeID, DeductionType, IsActive, Percentage) VALUES (101, 'Income Tax', 'Yes', 13)`,
  `INSERT INTO Deductions (EmployeeID, DeductionType, IsActive, Percentage) VALUES (101, 'Health Insurance', 'Yes', 5)`,
  `INSERT INTO Deductions (EmployeeID, DeductionType, IsActive, Percentage) VALUES (101, 'Retirement Plan', 'Yes', 3)`,

  `INSERT INTO Deductions (EmployeeID, DeductionType, IsActive, Percentage) VALUES (102, 'Income Tax', 'Yes', 13)`,
  `INSERT INTO Deductions (EmployeeID, DeductionType, IsActive, Percentage) VALUES (102, 'Health Insurance', 'Yes', 4)`,
  `INSERT INTO Deductions (EmployeeID, DeductionType, IsActive, Percentage) VALUES (102, 'Retirement Plan', 'Yes', 2)`,

  `INSERT INTO Deductions (EmployeeID, DeductionType, IsActive, Percentage) VALUES (103, 'Income Tax', 'Yes', 13)`,
  `INSERT INTO Deductions (EmployeeID, DeductionType, IsActive, Percentage) VALUES (103, 'Health Insurance', 'Yes', 6)`,
  `INSERT INTO Deductions (EmployeeID, DeductionType, IsActive, Percentage) VALUES (103, 'Retirement Plan', 'Yes', 4)`,

  `INSERT INTO Deductions (EmployeeID, DeductionType, IsActive, Percentage) VALUES (104, 'Income Tax', 'Yes', 13)`,
  `INSERT INTO Deductions (EmployeeID, DeductionType, IsActive, Percentage) VALUES (104, 'Health Insurance', 'Yes', 3)`,
  `INSERT INTO Deductions (EmployeeID, DeductionType, IsActive, Percentage) VALUES (104, 'Retirement Plan', 'Yes', 2)`,

  `INSERT INTO Deductions (EmployeeID, DeductionType, IsActive, Percentage) VALUES (105, 'Income Tax', 'Yes', 13)`,
  `INSERT INTO Deductions (EmployeeID, DeductionType, IsActive, Percentage) VALUES (105, 'Health Insurance', 'Yes', 5)`,
  `INSERT INTO Deductions (EmployeeID, DeductionType, IsActive, Percentage) VALUES (105, 'Retirement Plan', 'Yes', 3)`,

  `INSERT INTO Deductions (EmployeeID, DeductionType, IsActive, Percentage) VALUES (106, 'Income Tax', 'Yes', 13)`,
  `INSERT INTO Deductions (EmployeeID, DeductionType, IsActive, Percentage) VALUES (106, 'Health Insurance', 'Yes', 4)`,
  `INSERT INTO Deductions (EmployeeID, DeductionType, IsActive, Percentage) VALUES (106, 'Retirement Plan', 'Yes', 2)`,

  `INSERT INTO Payroll (PayrollID, EmployeeID, PeriodStart, PeriodEnd, BasePayment, OvertimeHour, OvertimePay, NetPayment) 
  VALUES (1001, 101, DATE '2023-08-01', DATE '2023-08-31', 5833.33, 0, 0.0, 5833.33)`,

  `INSERT INTO Payroll (PayrollID, EmployeeID, PeriodStart, PeriodEnd, BasePayment, OvertimeHour, OvertimePay, NetPayment) 
  VALUES (1002, 102, DATE '2023-08-01', DATE '2023-08-31', 6400, 10, 600, 7000)`,

  `INSERT INTO Payroll (PayrollID, EmployeeID, PeriodStart, PeriodEnd, BasePayment, OvertimeHour, OvertimePay, NetPayment) 
  VALUES (1003, 103, DATE '2023-08-01', DATE '2023-08-31', 7916.67, 0, 0.0, 7916.67)`,

  `INSERT INTO Payroll (PayrollID, EmployeeID, PeriodStart, PeriodEnd, BasePayment, OvertimeHour, OvertimePay, NetPayment) 
  VALUES (1004, 104, DATE '2023-08-01', DATE '2023-08-31', 3200, 5, 150, 3350)`,

  `INSERT INTO Payroll (PayrollID, EmployeeID, PeriodStart, PeriodEnd, BasePayment, OvertimeHour, OvertimePay, NetPayment) 
  VALUES (1005, 105, DATE '2023-08-01', DATE '2023-08-31', 6666.67, 0, 0.0, 6666.67)`,

  `INSERT INTO Payroll (PayrollID, EmployeeID, PeriodStart, PeriodEnd, BasePayment, OvertimeHour, OvertimePay, NetPayment) 
  VALUES (1006, 106, DATE '2023-08-01', DATE '2023-08-31', 2880, 8, 216, 3096)`,

  `INSERT INTO GrossPayCalculation (BasePayment, OvertimeHour, OvertimePay, GrossPayment) VALUES (5833.33, 0, 0.0, 4666.66)`,
  `INSERT INTO GrossPayCalculation (BasePayment, OvertimeHour, OvertimePay, GrossPayment) VALUES (6400, 10, 600, 5950)`,
  `INSERT INTO GrossPayCalculation (BasePayment, OvertimeHour, OvertimePay, GrossPayment) VALUES (7916.67, 0, 0.0, 6175)`,
  `INSERT INTO GrossPayCalculation (BasePayment, OvertimeHour, OvertimePay, GrossPayment) VALUES (3200, 5, 150, 3015)`,
  `INSERT INTO GrossPayCalculation (BasePayment, OvertimeHour, OvertimePay, GrossPayment) VALUES (6666.67, 0, 0.0, 5466.67)`,
  `INSERT INTO GrossPayCalculation (BasePayment, OvertimeHour, OvertimePay, GrossPayment) VALUES (2880, 8, 216, 2724.48)`,

  `INSERT INTO Attendance (EmployeeID, DateWorked, ClockIn, ClockOut, HoursWorked, OvertimeHours) 
  VALUES (102, TO_DATE('2023-08-10','YYYY-MM-DD'), TO_DATE('2023-08-10 09:00:00','YYYY-MM-DD HH24:MI:SS'), TO_DATE('2023-08-10 18:00:00','YYYY-MM-DD HH24:MI:SS'), 8, 1)`,

  `INSERT INTO Attendance (EmployeeID, DateWorked, ClockIn, ClockOut, HoursWorked, OvertimeHours) 
  VALUES (104, TO_DATE('2023-08-10','YYYY-MM-DD'), TO_DATE('2023-08-10 09:30:00','YYYY-MM-DD HH24:MI:SS'), TO_DATE('2023-08-10 17:30:00','YYYY-MM-DD HH24:MI:SS'), 7, 0)`,

  `INSERT INTO Attendance (EmployeeID, DateWorked, ClockIn, ClockOut, HoursWorked, OvertimeHours) 
  VALUES (106, TO_DATE('2023-08-10','YYYY-MM-DD'), TO_DATE('2023-08-10 10:00:00','YYYY-MM-DD HH24:MI:SS'), TO_DATE('2023-08-10 19:00:00','YYYY-MM-DD HH24:MI:SS'), 8, 1)`,

  `INSERT INTO Bonus (EmployeeID, BonusType, Amount, DateGranted) VALUES (101, 'Performance', 2000, TO_DATE('2023-07-15','YYYY-MM-DD'))`,
  `INSERT INTO Bonus (EmployeeID, BonusType, Amount, DateGranted) VALUES (103, 'Retention', 3000, TO_DATE('2023-06-20','YYYY-MM-DD'))`,
  `INSERT INTO Bonus (EmployeeID, BonusType, Amount, DateGranted) VALUES (105, 'Holiday', 1000, TO_DATE('2022-12-25','YYYY-MM-DD'))`,

  `INSERT INTO PayrollDeductionHistory (PayrollID, DeductionType, Amount) VALUES (1001, 'Income Tax', 5000 * 0.20)`,
  `INSERT INTO PayrollDeductionHistory (PayrollID, DeductionType, Amount) VALUES (1001, 'Health Insurance', 200)`,
  `INSERT INTO PayrollDeductionHistory (PayrollID, DeductionType, Amount) VALUES (1001, 'Retirement Plan', 5000 * 0.02)`,

  `INSERT INTO PayrollDeductionHistory (PayrollID, DeductionType, Amount) VALUES (1002, 'Income Tax', 4500 * 0.20)`,
  `INSERT INTO PayrollDeductionHistory (PayrollID, DeductionType, Amount) VALUES (1002, 'Health Insurance', 200)`,
  `INSERT INTO PayrollDeductionHistory (PayrollID, DeductionType, Amount) VALUES (1002, 'Retirement Plan', 4500 * 0.02)`,

  `INSERT INTO PayrollDeductionHistory (PayrollID, DeductionType, Amount) VALUES (1003, 'Income Tax', 6000 * 0.20)`,
  `INSERT INTO PayrollDeductionHistory (PayrollID, DeductionType, Amount) VALUES (1003, 'Health Insurance', 200)`,
  `INSERT INTO PayrollDeductionHistory (PayrollID, DeductionType, Amount) VALUES (1003, 'Retirement Plan', 6000 * 0.02)`,

  `INSERT INTO PayrollDeductionHistory (PayrollID, DeductionType, Amount) VALUES (1004, 'Income Tax', 5500 * 0.20)`,
  `INSERT INTO PayrollDeductionHistory (PayrollID, DeductionType, Amount) VALUES (1004, 'Health Insurance', 200)`,
  `INSERT INTO PayrollDeductionHistory (PayrollID, DeductionType, Amount) VALUES (1004, 'Retirement Plan', 5500 * 0.02)`,

  `INSERT INTO PayrollDeductionHistory (PayrollID, DeductionType, Amount) VALUES (1005, 'Income Tax', 4000 * 0.20)`,
  `INSERT INTO PayrollDeductionHistory (PayrollID, DeductionType, Amount) VALUES (1005, 'Health Insurance', 200)`,
  `INSERT INTO PayrollDeductionHistory (PayrollID, DeductionType, Amount) VALUES (1005, 'Retirement Plan', 4000 * 0.02)`,

  `INSERT INTO PayrollDeductionHistory (PayrollID, DeductionType, Amount) VALUES (1006, 'Income Tax', 3096 * 0.20)`,
  `INSERT INTO PayrollDeductionHistory (PayrollID, DeductionType, Amount) VALUES (1006, 'Health Insurance', 200)`,
  `INSERT INTO PayrollDeductionHistory (PayrollID, DeductionType, Amount) VALUES (1006, 'Retirement Plan', 3096 * 0.02)`,

  //106 - 133

  //1
  `SELECT
  DISTINCT DeductionType
  FROM Deductions`,

  //2
  `SELECT
  h.HourlyRate, 
  h.OvertimeRate,
  e.EmployeeID, 
  e.FirstName, 
  e.LastName, 
  e.Email, 
  e.DepartmentID, 
  e.JobPositionID,
  e.WageJobPosition, 
  e.IsManager
  FROM HourlyEmployee h 
  JOIN Employee e 
  ON h.EmployeeID = e.EmployeeID`,

  //3
  `SELECT * 
  FROM Employee 
  WHERE IsManager = 'Yes'`,

  //4
  `SELECT 
      e.EmployeeID,
      e.FirstName,
      e.Email,
      e.PhoneNumber,
      e.StreetNumber,
      e.StreetName,
      e.City,
      e.ArrivalDate,
      e.DateOfBirth,
      e.DepartmentID,
      e.JobPositionID,
      e.WageJobPosition,
      e.IsManager,
      s.AnnualSalary
  FROM Employee e 
  JOIN SalariedEmployee s 
  ON e.EmployeeID = s.EmployeeID
  WHERE s.AnnualSalary > 70000
  ORDER BY s.AnnualSalary DESC`,

  //5
  `--List department names and the number of employees from each department (Department Table)
  SELECT DepartmentName, 'employee count is: ', NumberOfEmployees  
  FROM Department
  ORDER BY NumberOfEmployees DESC`,

  //6
  `--Get the average grosspay for each period (Payroll Table)
  SELECT PeriodStart, PeriodEnd, AVG(GrossPayment) 
  FROM GrossPayCalculation g 
  JOIN Payroll p ON g.BasePayment = p.BasePayment AND g.OvertimeHour = p.OvertimeHour AND g.OvertimePay = p.OvertimePay 
  GROUP BY PeriodStart, PeriodEnd`,

  //7
  `--Figure out exact amount of each deduction for a given employee for a given payroll (PayrollDeductionHistory Table)
  SELECT * 
  FROM PayrollDeductionHistory 
  WHERE PayrollID = 1001 
  ORDER BY Amount DESC`,

  //8
  `--List bonuses by employee (Bonus table)
  SELECT b.EmployeeID, e.FirstName, e.LastName, b.BonusType, b.Amount, b.DateGranted 
  FROM Bonus b 
  JOIN Employee e ON b.EmployeeID = e.EmployeeID 
  ORDER BY b.amount`,

  //9
  `--List employees who worked overtime in descending order (Attendance table)
  SELECT a.EmployeeID, DateWorked, HoursWorked, OvertimeHours 
  FROM Attendance a 
  WHERE a.OvertimeHours > 0 
  ORDER BY DateWorked DESC`,

  //10
  `--Count how many employees are in each job position (JobPosition Table)
  SELECT jp.JobPositionTitle, COUNT(e.EmployeeID) AS NumEmployees 
  FROM JobPosition jp, Employee e 
  WHERE jp.JobPositionID = e.JobPositionID 
  GROUP BY jp.JobPositionTitle 
  ORDER BY NumEmployees DESC`,

  //11
  `-- Calculate Total Annual Payroll Cost by Department
  SELECT
      d.DepartmentName,
      SUM(
          CASE
              WHEN e.WageJobPosition = 'Salary' THEN se.AnnualSalary
              WHEN e.WageJobPosition = 'Hourly' THEN he.HourlyRate * 2080
              ELSE 0
          END
      ) AS TotalAnnualPayroll
      FROM Employee e
      JOIN Department d ON e.DepartmentID = d.DepartmentID
      LEFT JOIN SalariedEmployee se ON e.EmployeeID = se.EmployeeID
      LEFT JOIN HourlyEmployee he ON e.EmployeeID = he.EmployeeID
      GROUP BY d.DepartmentName
      ORDER BY TotalAnnualPayroll DESC`,

  //12 --Updating Query
  `-- Insert Employees into Payroll
  INSERT INTO Payroll(PayrollID, EmployeeID, PeriodStart, PeriodEnd, BasePayment, OvertimeHour, OvertimePay, NetPayment)
  SELECT
    Payroll_SEQ.NEXTVAL AS PayrollID,
    e.EmployeeID,
    TO_DATE('2025-09-29', 'YYYY-MM-DD') AS PeriodStart,
      TO_DATE('2025-10-06', 'YYYY-MM-DD') AS PeriodEnd,
      s.AnnualSalary / 26 AS BasePayment,
      0 AS OvertimeHour,
      0.0 AS OvertimePay,
      (s.AnnualSalary / 26) + 0.0 AS NetPayment
  FROM Employee e 
  JOIN SalariedEmployee s ON e.EmployeeID = s.EmployeeID`,

  //13 --Updating Query
  `-- Create a history for deductions
  INSERT INTO PayrollDeductionHistory (PayrollID, DeductionType, Amount)
  SELECT
    p.PayrollID,
    d.DeductionType,
    CASE d.DeductionType
      WHEN 'Income Tax' THEN g.GrossPayment - (g.GrossPayment * (d.Percentage / 100))
      WHEN 'Retirement' THEN g.GrossPayment - (g.GrossPayment * (d.Percentage / 100))
          ELSE 0
    END AS Amount
  FROM GrossPayCalculation g
  JOIN Payroll p ON g.BasePayment = p.BasePayment AND g.OvertimeHour = p.OvertimeHour AND g.OvertimePay = p.OvertimePay
  JOIN Deductions d ON p.EmployeeID = d.EmployeeID
  WHERE p.PeriodEnd = TO_DATE('2025-10-06', 'YYYY-MM-DD')
  AND d.IsActive = 'Yes'`,

  //14 --Updating Query
  `-- Update NetPayment in Payroll after deductions
  UPDATE Payroll p
  SET NetPayment = (
      SELECT g.GrossPayment 
            - NVL((
                  SELECT SUM(pdh.Amount)
                  FROM PayrollDeductionHistory pdh
                  WHERE pdh.PayrollID = p.PayrollID
              ), 0)
      FROM GrossPayCalculation g
      WHERE g.BasePayment = p.BasePayment
        AND g.OvertimeHour = p.OvertimeHour
        AND g.OvertimePay = p.OvertimePay
  )
  WHERE p.PeriodEnd = TO_DATE('2025-10-06', 'YYYY-MM-DD')`,

  //15
  `-- Top highest paid salaried employees with their department and job title
  SELECT  
      e.FirstName || ' ' || e.LastName AS EmployeeName,
      d.DepartmentName,
      jp.JobPositionTitle AS JobTitle,
      s.AnnualSalary
  FROM Employee e
  JOIN Department d ON e.DepartmentID = d.DepartmentID
  JOIN JobPosition jp ON e.JobPositionID = jp.JobPositionID
  JOIN SalariedEmployee s ON e.EmployeeID = s.EmployeeID
  ORDER BY s.AnnualSalary DESC`,

  //16
  `-- Calculate total overtime pay for each hourly employee
  SELECT 
      e.FirstName || ' ' || e.LastName AS EmployeeName,
      SUM(a.OvertimeHours) AS TotalOvertimeHours,
      h.OvertimeRate,
      SUM(a.OvertimeHours * h.OvertimeRate) AS TotalOvertimePay
  FROM Employee e
  JOIN Attendance a ON e.EmployeeID = a.EmployeeID
  JOIN HourlyEmployee h ON e.EmployeeID = h.EmployeeID
  GROUP BY e.FirstName, e.LastName, h.OvertimeRate
  ORDER BY TotalOvertimePay DESC`,

  //17
  `-- List of payroll deductions for each employee per period, with their total deductions for comparison
  SELECT 
      pdh.PayrollID, 
      e.FirstName || ' ' || e.LastName AS EmployeeName, 
      p.PeriodStart, 
      p.PeriodEnd, 
      pdh.DeductionType, 
      pdh.Amount,
      (SELECT SUM(Amount)
      FROM PayrollDeductionHistory pdh1
      WHERE pdh1.PayrollID = pdh.PayrollID
      ) AS TotalDeductionsThisPeriod
  FROM PayrollDeductionHistory pdh, Employee e, Payroll p
  WHERE pdh.PayrollID = p.PayrollID
  AND e.EmployeeID = p.EmployeeID`,

  //18
  `CREATE VIEW ActiveDeductions AS
  SELECT e.FirstName || ' ' || e.LastName AS EmployeeName, d.DeductionType, d.Percentage
  FROM Employee e
  JOIN Deductions d ON e.EmployeeID = d.EmployeeID
  WHERE IsActive = 'Yes'
  WITH READ ONLY`,

  //19
  `CREATE VIEW FullEmployeeProfile AS
  SELECT 
      e.FirstName || ' ' || e.LastName AS EmployeeName,
      e.Email,
      e.StreetNumber || ' ' || e.StreetName || ', ' || e.City AS Address,
      e.PhoneNumber,
      d.DepartmentName,
      jp.JobPositionTitle AS Position,
      e.IsManager,
      he.HourlyRate,
      se.AnnualSalary
  FROM Employee e
  JOIN Department d ON d.DepartmentID = e.DepartmentID
  JOIN JobPosition jp ON e.JobPositionID = jp.JobPositionID
  LEFT JOIN HourlyEmployee he ON e.EmployeeID = he.EmployeeID
  LEFT JOIN SalariedEmployee se ON e.EmployeeID = se.EmployeeID
  ORDER BY d.DepartmentName, EmployeeName
  WITH READ ONLY`,

  //20
  `CREATE VIEW DepartmentPayrollSummary AS
  SELECT 
      d.DepartmentName,
      SUM(
          (SELECT g.GrossPayment
          FROM GrossPayCalculation g
          WHERE g.BasePayment = p.BasePayment
            AND g.OvertimeHour = p.OvertimeHour
            AND g.OvertimePay = p.OvertimePay
          )
      ) AS TotalGrossPayment,
      SUM(p.NetPayment) AS TotalNetPayment,
      ROUND(AVG(p.NetPayment), 2) AS AvgNetPayment
  FROM Department d
  JOIN Employee e ON d.DepartmentID = e.DepartmentID
  JOIN Payroll p ON e.EmployeeID = p.EmployeeID
  GROUP BY d.DepartmentName
  ORDER BY TotalGrossPayment DESC
  WITH READ ONLY`,

  //21
  `(SELECT FirstName || ' ' || LastName AS EmployeeName, DepartmentName, JobPositionTitle AS JobTitle, 'Salaried' AS PayType
  FROM Employee, Department, JobPosition, SalariedEmployee
  WHERE SalariedEmployee.EmployeeID = Employee.EmployeeID
      AND Department.DepartmentID = Employee.DepartmentID
      AND JobPosition.JobPositionID = Employee.JobPositionID
  UNION
  SELECT FirstName || ' ' || LastName AS EmployeeName, DepartmentName, JobPositionTitle AS JobTitle, 'Hourly' AS PayType
  FROM Employee, Department, JobPosition, HourlyEmployee
  WHERE HourlyEmployee.EmployeeID = Employee.EmployeeID
      AND Department.DepartmentID = Employee.DepartmentID
      AND JobPosition.JobPositionID = Employee.JobPositionID)
  MINUS
  (SELECT FirstName || ' ' || LastName AS EmployeeName, DepartmentName, JobPositionTitle AS JobTitle, 'Salaried' AS PayType
  FROM Employee, Department, JobPosition, SalariedEmployee, Bonus
  WHERE SalariedEmployee.EmployeeID = Employee.EmployeeID
      AND Department.DepartmentID = Employee.DepartmentID
      AND JobPosition.JobPositionID = Employee.JobPositionID
      AND Bonus.EmployeeID = Employee.EmployeeID
  UNION
  SELECT FirstName || ' ' || LastName AS EmployeeName, DepartmentName, JobPositionTitle AS JobTitle, 'Hourly' AS PayType
  FROM Employee, Department, JobPosition, HourlyEmployee, Bonus
  WHERE HourlyEmployee.EmployeeID = Employee.EmployeeID
      AND Department.DepartmentID = Employee.DepartmentID
      AND JobPosition.JobPositionID = Employee.JobPositionID
      AND Bonus.EmployeeID = Employee.EmployeeID)`,

  //22
  `-- List out salaried employees who earn more than their department average.
  SELECT FirstName || ' ' || LastName AS EmployeeName, DepartmentName, JobPositionTitle AS JobTitle
  FROM Employee, SalariedEmployee se1, Department d1, JobPosition
  WHERE Employee.DepartmentID = d1.DepartmentID
      AND JobPosition.JobPositionID = Employee.JobPositionID
      AND se1.EmployeeID = Employee.EmployeeID
      AND EXISTS (
          SELECT DepartmentName, AVG(AnnualSalary)
          FROM Department d2, Employee, SalariedEmployee se2
          WHERE se2.EmployeeID = Employee.EmployeeID
              AND d2.DepartmentID = Employee.DepartmentID
              AND d2.DepartmentID = d1.DepartmentID
          GROUP BY DepartmentName
          HAVING AVG(AnnualSalary) < se1.AnnualSalary
      )`,

  //23
  `-- List departments with more than 2 employees and total gross payments over 10,000 (COUNT, GROUP BY, HAVING)
  SELECT 
      d.DepartmentName,
      COUNT(DISTINCT e.EmployeeID) AS NumEmployees,
      SUM(g.GrossPayment) AS TotalGross
  FROM Department d
  JOIN Employee e ON d.DepartmentID = e.DepartmentID
  JOIN Payroll p ON e.EmployeeID = p.EmployeeID
  JOIN GrossPayCalculation g 
      ON g.BasePayment = p.BasePayment
    AND g.OvertimeHour = p.OvertimeHour
    AND g.OvertimePay = p.OvertimePay
  GROUP BY d.DepartmentName
  HAVING COUNT(DISTINCT e.EmployeeID) > 2
    AND SUM(g.GrossPayment) > 10000
  ORDER BY TotalGross DESC`,

  //24
  `-- List employees who have both received a bonus and have active deductions (EXISTS)
  SELECT e.EmployeeID,
        e.FirstName || ' ' || e.LastName AS EmployeeName
  FROM Employee e
  WHERE EXISTS (
      SELECT 1 FROM Bonus b WHERE b.EmployeeID = e.EmployeeID
  )
  AND EXISTS (
      SELECT 1 FROM Deductions d WHERE d.EmployeeID = e.EmployeeID
      AND d.IsActive = 'Yes'
  )
  ORDER BY e.EmployeeID`,

  //25
  `-- Employees paid in September but not in October (MINUS)
  (SELECT e.EmployeeID,
          e.FirstName || ' ' || e.LastName AS EmployeeName
  FROM Employee e, Payroll p
  WHERE e.EmployeeID = p.EmployeeID
    AND p.PERIODSTART BETWEEN DATE '2025-09-01' AND DATE '2025-09-30')
  MINUS
  (SELECT e.EmployeeID,
          e.FirstName || ' ' || e.LastName AS EmployeeName
  FROM Employee e, Payroll p
  WHERE e.EmployeeID = p.EmployeeID
    AND p.PERIODSTART BETWEEN DATE '2025-10-01' AND DATE '2025-10-31')`,

  //26
  `-- List job positions where the average salary is greater than the company's overall average
  SELECT JobPositionTitle, AVG(AnnualSalary) AS Average_Salary
  FROM   JobPosition j, Employee e, SalariedEmployee s
  WHERE  j.JobPositionID = e.JobPositionID
    AND s.EmployeeID = e.EmployeeID
  GROUP BY JobPositionTitle
  HAVING AVG(AnnualSalary) > 
        (SELECT AVG(AnnualSalary)
        FROM   SalariedEmployee)
  ORDER BY Average_Salary DESC`,

  //27
  `-- List employees whose total bonuses exceed their total deductions
  SELECT e.EmployeeID, 
        e.FirstName || ' ' || e.LastName AS EmployeeName
  FROM   Employee e
  WHERE EXISTS (
    SELECT 1
    FROM   Bonus b
    WHERE  b.EmployeeID = e.EmployeeID
    GROUP BY b.EmployeeID
    HAVING SUM(b.Amount) >
            (SELECT NVL(SUM(pdh.Amount), 0)
            FROM   PayrollDeductionHistory pdh, Payroll p
            WHERE  pdh.PayrollID = p.PayrollID
            AND    p.EmployeeID = e.EmployeeID)
  )
  ORDER BY e.EmployeeID`
]

/**
 * POST /admin/refresh
 * Runs the refresh.sql file.
*/
router.post('/refresh', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "username and password required" });
  }

  let conn;

  try {
     conn = await oracle.getConnection(username, password);

    for (const sql of statements) {
      await conn.execute(sql);
    }

    await conn.commit();

    return res.json({ success: true });

  } catch (err) {
    console.error("REFRESH ERROR:", err);
    return res.status(500).json({ error: err.message });

  } finally {
    if (conn) {
      try { await conn.close(); } catch (e) {}
    }
  }
});

/**
 * POST /admin/drop-table
 * Body: { username, password }
 */
router.post('/drop-tables', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "username and password required" });
  }

  let conn;

  try {
    const conn = await oracle.getConnection(username, password);

    for (const sql of statements.slice(0, 16)) {
      await conn.execute(sql);
      console.log(sql);
    }

    await conn.commit();

    return res.json({ success: true });

  } catch (err) {
    console.error("DROP ERROR:", err);
    return res.status(500).json({ error: err.message });

  } finally {
    if (conn) {
      try { await conn.close(); } catch (e) {}
    }
  }
});

/**
 * POST /admin/create-table
 * Body: { username, password }
 */
router.post('/create-tables', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "username and password required" });
  }

  let conn;

  try {
    conn = await oracle.getConnection(username, password);

    for (const sql of statements.slice(16, 29)) {
      await conn.execute(sql);
      console.log(sql);
    }

    await conn.commit();

    return res.json({ success: true });

  } catch (err) {
    console.error("CREATION ERROR:", err);
    return res.status(500).json({ error: err.message });

  } finally {
    if (conn) {
      try { await conn.close(); } catch (e) {}
    }
  }
});


/**
 * POST /admin/populate-tables
 * Body: { username, password }
 */
router.post('/populate-tables', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "username and password required" });
  }

  let conn;

  try {
    conn = await oracle.getConnection(username, password);

    for (const sql of statements.slice(29, 106)) {
      await conn.execute(sql);
      console.log(sql);
    }

    await conn.commit();

    return res.json({ success: true });

  } catch (err) {
    console.error("POPULATE ERROR:", err);
    return res.status(500).json({ error: err.message });

  } finally {
    if (conn) {
      try { await conn.close(); } catch (e) {}
    }
  }
});


/**
 * POST /admin/query
 * Body: { username, password, choice: 1 }
*/
router.post('/query', async (req, res) => {
  const { username, password, choice } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "username and password required" });
  }

  let conn;

  try {
    conn = await oracle.getConnection(username, password);

    // START FROM 1 WHEN CHOSING QUERY
    const sql = statements[statements.length - 28 + choice];
    if (!sql) return res.status(400).json({ error: "invalid query choice" });
    const result = await conn.execute(sql, [], { outFormat: oracledb.OUT_FORMAT_OBJECT });
    console.log(sql);
    
    return res.json({ success: true, rows: result.rows, columns: result.metaData });

  } catch (err) {
    console.error("QUERY ERROR:", err);
    return res.status(500).json({ error: err.message });

  } finally {
    if (conn) {
      try { await conn.close(); } catch (e) {}
    }
  }
});

/**
 * POST /admin/department-insert
 * Body: { username, password, values: [2001, "Research and Development", 15] }
*/
router.post('/department-insert', async (req, res) => {
  const { username, password, user_values } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "username and password required" });
  }

  let conn;

  try {
    conn = await oracle.getConnection(username, password);

    const sql = `INSERT INTO Department (DepartmentID, DepartmentName, NumberOfEmployees) VALUES (${user_values[0]}, '${user_values[1]}', ${user_values[2]})`;
    if (!sql) return res.status(400).json({ error: "invalid query choice" });
    const result = await conn.execute(sql, [], { outFormat: oracledb.OUT_FORMAT_OBJECT });
    console.log(sql);
    
    return res.json({ success: true, rows: result.rows });

  } catch (err) {
    console.error("QUERY ERROR:", err);
    return res.status(500).json({ error: err.message });

  } finally {
    if (conn) {
      try { await conn.close(); } catch (e) {}
    }
  }
});

/**
 * POST /admin/department-manager-insert
 * Body: { username, password, values: [2002, "DevOps Manager"] }
*/
router.post('/department-manager-insert', async (req, res) => {
  const { username, password, user_values } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "username and password required" });
  }

  let conn;

  try {
    conn = await oracle.getConnection(username, password);

    const sql = `INSERT INTO DepartmentManager (ManagerID, DepartmentName) VALUES (${user_values[0]}, '${user_values[1]}')`;
    if (!sql) return res.status(400).json({ error: "invalid query choice" });
    const result = await conn.execute(sql, [], { outFormat: oracledb.OUT_FORMAT_OBJECT });
    console.log(sql);
    
    return res.json({ success: true, rows: result.rows });

  } catch (err) {
    console.error("QUERY ERROR:", err);
    return res.status(500).json({ error: err.message });

  } finally {
    if (conn) {
      try { await conn.close(); } catch (e) {}
    }
  }
});

/**
 * POST /admin/job-position-insert
 * Body: { username, password, values: [2003, "Programmer"] }
*/
router.post('/job-position-insert', async (req, res) => {
  const { username, password, user_values } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "username and password required" });
  }

  let conn;

  try {
    conn = await oracle.getConnection(username, password);

    const sql = `INSERT INTO JobPosition (JobPositionID, JobPositionTitle) VALUES (${user_values[0]}, '${user_values[1]}')`;
    if (!sql) return res.status(400).json({ error: "invalid query choice" });
    const result = await conn.execute(sql, [], { outFormat: oracledb.OUT_FORMAT_OBJECT });
    console.log(sql);
    
    return res.json({ success: true, rows: result.rows });

  } catch (err) {
    console.error("QUERY ERROR:", err);
    return res.status(500).json({ error: err.message });

  } finally {
    if (conn) {
      try { await conn.close(); } catch (e) {}
    }
  }
});

/**
 * POST /admin/employee-insert
 * Body: { username, password, values: [2004, "Santa", "Claus", "santa.claus@gmail.com", 12, "North Pole", "Artic", "2020-05-12", "4161111111", "1990-03-15", 1, 1, "Salary", "Yes"] }
*/
router.post('/employee-insert', async (req, res) => {
  const { username, password, user_values } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "username and password required" });
  }

  let conn;

  try {
    conn = await oracle.getConnection(username, password);

    const sql = `INSERT INTO Employee (EmployeeID, FirstName, LastName, Email, StreetNumber, StreetName, City, ArrivalDate, PhoneNumber, DateOfBirth, DepartmentID, JobPositionID, WageJobPosition, IsManager)  VALUES (${user_values[0]}, '${user_values[1]}', '${user_values[2]}', '${user_values[3]}', ${user_values[4]}, '${user_values[5]}', '${user_values[6]}', TO_DATE('${user_values[7]}','YYYY-MM-DD'), '${user_values[8]}', TO_DATE('${user_values[9]}','YYYY-MM-DD'), ${user_values[10]}, ${user_values[11]}, '${user_values[12]}', '${user_values[13]}')`;
    if (!sql) return res.status(400).json({ error: "invalid query choice" });
    const result = await conn.execute(sql, [], { outFormat: oracledb.OUT_FORMAT_OBJECT });
    console.log(sql);
    
    return res.json({ success: true, rows: result.rows });

  } catch (err) {
    console.error("QUERY ERROR:", err);
    return res.status(500).json({ error: err.message });

  } finally {
    if (conn) {
      try { await conn.close(); } catch (e) {}
    }
  }
});

/**
 * POST /admin/hourly-employee-insert
 * Body: { username, password, values: [101, 50, 80] }
*/
router.post('/hourly-employee-insert', async (req, res) => {
  const { username, password, user_values } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "username and password required" });
  }

  let conn;

  try {
    conn = await oracle.getConnection(username, password);

    const sql = `INSERT INTO HourlyEmployee (EmployeeID, HourlyRate, OvertimeRate) VALUES (${user_values[0]}, ${user_values[1]}, ${user_values[2]})`;
    if (!sql) return res.status(400).json({ error: "invalid query choice" });
    const result = await conn.execute(sql, [], { outFormat: oracledb.OUT_FORMAT_OBJECT });
    console.log(sql);
    
    return res.json({ success: true, rows: result.rows });

  } catch (err) {
    console.error("QUERY ERROR:", err);
    return res.status(500).json({ error: err.message });

  } finally {
    if (conn) {
      try { await conn.close(); } catch (e) {}
    }
  }
});

/**
 * POST /admin/salaried-employee-insert
 * Body: { username, password, values: [102, 80000] }
*/
router.post('/salaried-employee-insert', async (req, res) => {
  const { username, password, user_values } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "username and password required" });
  }

  let conn;

  try {
    conn = await oracle.getConnection(username, password);

    const sql = `INSERT INTO SalariedEmployee (EmployeeID, AnnualSalary) VALUES (${user_values[0]}, ${user_values[1]})`;
    if (!sql) return res.status(400).json({ error: "invalid query choice" });
    const result = await conn.execute(sql, [], { outFormat: oracledb.OUT_FORMAT_OBJECT });
    console.log(sql);
    
    return res.json({ success: true, rows: result.rows });

  } catch (err) {
    console.error("QUERY ERROR:", err);
    return res.status(500).json({ error: err.message });

  } finally {
    if (conn) {
      try { await conn.close(); } catch (e) {}
    }
  }
});

/**
 * POST /admin/deductions-insert
 * Body: { username, password, values: [101, "Foreign Tax", "No", 2] }
*/
router.post('/deductions-insert', async (req, res) => {
  const { username, password, user_values } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "username and password required" });
  }

  let conn;

  try {
    conn = await oracle.getConnection(username, password);

    const sql = `INSERT INTO Deductions (EmployeeID, DeductionType, IsActive, Percentage) VALUES (${user_values[0]}, '${user_values[1]}', '${user_values[2]}', ${user_values[3]})`;
    if (!sql) return res.status(400).json({ error: "invalid query choice" });
    const result = await conn.execute(sql, [], { outFormat: oracledb.OUT_FORMAT_OBJECT });
    console.log(sql);
    
    return res.json({ success: true, rows: result.rows });

  } catch (err) {
    console.error("QUERY ERROR:", err);
    return res.status(500).json({ error: err.message });

  } finally {
    if (conn) {
      try { await conn.close(); } catch (e) {}
    }
  }
});

/**
 * POST /admin/payroll-insert
 * Body: { username, password, values: [2005, 101, "2023-08-01", "2023-08-31", 5833.33, 0, 0.0, 5833.33] }
*/
router.post('/payroll-insert', async (req, res) => {
  const { username, password, user_values } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "username and password required" });
  }

  let conn;

  try {
    conn = await oracle.getConnection(username, password);

    const sql = `INSERT INTO Payroll (PayrollID, EmployeeID, PeriodStart, PeriodEnd, BasePayment, OvertimeHour, OvertimePay, NetPayment) VALUES (${user_values[0]}, ${user_values[1]}, DATE '${user_values[2]}', DATE '${user_values[3]}', ${user_values[4]}, ${user_values[5]}, ${user_values[6]}, ${user_values[7]})`;
    if (!sql) return res.status(400).json({ error: "invalid query choice" });
    const result = await conn.execute(sql, [], { outFormat: oracledb.OUT_FORMAT_OBJECT });
    console.log(sql);
    
    return res.json({ success: true, rows: result.rows });

  } catch (err) {
    console.error("QUERY ERROR:", err);
    return res.status(500).json({ error: err.message });

  } finally {
    if (conn) {
      try { await conn.close(); } catch (e) {}
    }
  }
});

/**
 * POST /admin/gross-pay-calculation-insert
 * Body: { username, password, values: [5833.33, 1, 0.0, 4666.66] }
*/
router.post('/gross-pay-calculation-insert', async (req, res) => {
  const { username, password, user_values } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "username and password required" });
  }

  let conn;

  try {
    conn = await oracle.getConnection(username, password);

    const sql = `INSERT INTO GrossPayCalculation (BasePayment, OvertimeHour, OvertimePay, GrossPayment) VALUES (${user_values[0]}, ${user_values[1]}, ${user_values[2]}, ${user_values[3]})`;
    if (!sql) return res.status(400).json({ error: "invalid query choice" });
    const result = await conn.execute(sql, [], { outFormat: oracledb.OUT_FORMAT_OBJECT });
    console.log(sql);
    
    return res.json({ success: true, rows: result.rows });

  } catch (err) {
    console.error("QUERY ERROR:", err);
    return res.status(500).json({ error: err.message });

  } finally {
    if (conn) {
      try { await conn.close(); } catch (e) {}
    }
  }
});

/**
 * POST /admin/attendance-insert
 * Body: { username, password, values: [101, "2023-08-10", "2023-08-10 09:00:00", "2023-08-10 18:00:00", 8, 1] }
*/
router.post('/attendance-insert', async (req, res) => {
  const { username, password, user_values } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "username and password required" });
  }

  let conn;

  try {
    conn = await oracle.getConnection(username, password);

    const sql = `INSERT INTO Attendance (EmployeeID, DateWorked, ClockIn, ClockOut, HoursWorked, OvertimeHours) VALUES (${user_values[0]}, TO_DATE('${user_values[1]}','YYYY-MM-DD'), TO_DATE('${user_values[2]}','YYYY-MM-DD HH24:MI:SS'), TO_DATE('${user_values[3]}','YYYY-MM-DD HH24:MI:SS'), ${user_values[4]}, ${user_values[5]})`;
    if (!sql) return res.status(400).json({ error: "invalid query choice" });
    const result = await conn.execute(sql, [], { outFormat: oracledb.OUT_FORMAT_OBJECT });
    console.log(sql);
    
    return res.json({ success: true, rows: result.rows });

  } catch (err) {
    console.error("QUERY ERROR:", err);
    return res.status(500).json({ error: err.message });

  } finally {
    if (conn) {
      try { await conn.close(); } catch (e) {}
    }
  }
});

/**
 * POST /admin/bonus-insert
 * Body: { username, password, values: [101, "Birthday", 2000, "2025-07-15"] }
*/
router.post('/bonus-insert', async (req, res) => {
  const { username, password, user_values } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "username and password required" });
  }

  let conn;

  try {
    conn = await oracle.getConnection(username, password);

    const sql = `INSERT INTO Bonus (EmployeeID, BonusType, Amount, DateGranted) VALUES (${user_values[0]}, '${user_values[1]}', ${user_values[2]}, TO_DATE('${user_values[3]}','YYYY-MM-DD'))`;
    if (!sql) return res.status(400).json({ error: "invalid query choice" });
    const result = await conn.execute(sql, [], { outFormat: oracledb.OUT_FORMAT_OBJECT });
    console.log(sql);
    
    return res.json({ success: true, rows: result.rows });

  } catch (err) {
    console.error("QUERY ERROR:", err);
    return res.status(500).json({ error: err.message });

  } finally {
    if (conn) {
      try { await conn.close(); } catch (e) {}
    }
  }
});

/**
 * POST /admin/payroll-deduction-history-insert
 * Body: { username, password, values: [1001, "Property Tax", 2000] }
*/
router.post('/payroll-deduction-history-insert', async (req, res) => {
  const { username, password, user_values } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "username and password required" });
  }

  let conn;

  try {
    conn = await oracle.getConnection(username, password);

    const sql = `INSERT INTO PayrollDeductionHistory (PayrollID, DeductionType, Amount) VALUES (${user_values[0]}, '${user_values[1]}', ${user_values[2]})`;
    if (!sql) return res.status(400).json({ error: "invalid query choice" });
    const result = await conn.execute(sql, [], { outFormat: oracledb.OUT_FORMAT_OBJECT });
    console.log(sql);
    
    return res.json({ success: true, rows: result.rows });

  } catch (err) {
    console.error("QUERY ERROR:", err);
    return res.status(500).json({ error: err.message });

  } finally {
    if (conn) {
      try { await conn.close(); } catch (e) {}
    }
  }
});

module.exports = router;