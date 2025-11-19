CREATE TABLE Department (
    DepartmentID INT PRIMARY KEY,
    DepartmentName VARCHAR2(100) NOT NULL,
    NumberOfEmployees INT NOT NULL
);

CREATE TABLE JobPosition (
    JobPositionID INT PRIMARY KEY,
    JobPositionTitle VARCHAR2(100) NOT NULL
);

CREATE TABLE Employee (
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
);

CREATE TABLE HourlyEmployee (
    EmployeeID INT PRIMARY KEY,
    HourlyRate NUMBER(8,2) NOT NULL,
    OvertimeRate NUMBER(8,2) NOT NULL,
    FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID)
);

CREATE TABLE SalariedEmployee (
    EmployeeID INT PRIMARY KEY,
    AnnualSalary NUMBER(10,2) NOT NULL,
    FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID)
);

CREATE TABLE Deductions (
    EmployeeID INT NOT NULL,
    DeductionType VARCHAR2(100) NOT NULL,
    IsActive VARCHAR2(3) NOT NULL CHECK (IsActive IN ('Yes','No')),
    Percentage NUMBER(5,2) NOT NULL,
    PRIMARY KEY (EmployeeID, DeductionType),
    FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID)
);

CREATE TABLE Payroll (
    PayrollID INT PRIMARY KEY,
    EmployeeID INT NOT NULL,
    PeriodStart DATE NOT NULL,
    PeriodEnd DATE NOT NULL,
    BasePayment NUMBER(10,2) NOT NULL,
    OvertimeHour NUMBER(5,2) DEFAULT 0 NOT NULL,
    OvertimePay NUMBER(10,2) DEFAULT 0 NOT NULL,
    GrossPayment NUMBER(10,2) NOT NULL,
    NetPayment NUMBER(10,2) NOT NULL,
    FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID)
);

CREATE TABLE PayrollDeductionHistory (
    PayrollID INT NOT NULL,
    DeductionType VARCHAR2(100) NOT NULL,
    Amount NUMBER(10,2) NOT NULL,
    PRIMARY KEY (PayrollID, DeductionType),
    FOREIGN KEY (PayrollID) REFERENCES Payroll(PayrollID)
);

CREATE TABLE Attendance (
    EmployeeID INT NOT NULL,
    DateWorked DATE NOT NULL,
    ClockIn TIMESTAMP NOT NULL,
    ClockOut TIMESTAMP NOT NULL,
    HoursWorked NUMBER(5,2) NOT NULL,
    OvertimeHours NUMBER(5,2) DEFAULT 0 NOT NULL,
    PRIMARY KEY (EmployeeID, DateWorked),
    FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID)
);

CREATE TABLE Bonus (
    EmployeeID INT NOT NULL,
    BonusType VARCHAR2(50) NOT NULL,
    Amount NUMBER(10,2) NOT NULL,
    DateGranted DATE NOT NULL,
    PRIMARY KEY (EmployeeID, BonusType, DateGranted),
    FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID)
);

-- Create a Payroll Sequence to generate unique PayrollID values
CREATE SEQUENCE Payroll_SEQ
    START WITH 1
    INCREMENT BY 1
    NOCACHE
    NOCYCLE;