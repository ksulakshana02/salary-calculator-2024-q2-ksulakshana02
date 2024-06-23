export const calculateTotalEarnings = (basicSalary, earnings) => {
    return basicSalary + earnings.reduce((acc, earning) => acc + parseInt(earning.value, 10), 0);
};

export const calculateTotalEarningsForEPF = (basicSalary, earnings) => {
    return basicSalary + earnings.filter(earning => earning.epfEtf).reduce((acc, earning) => acc + parseInt(earning.value, 10), 0);
};

export const calculateGrossDeduction = (deductions) => {
    return deductions.reduce((acc, deduction) => acc + parseInt(deduction.value, 10), 0);
};

export const calculateGrossEarnings = (totalEarnings, grossDeduction) => {
    return totalEarnings - grossDeduction;
};

export const calculateGrossSalaryForEPF = (totalEarningsForEPF, grossDeduction) => {
    return totalEarningsForEPF - grossDeduction;
};

export const calculateEmployeeEPF = (grossSalaryForEPF) => {
    return grossSalaryForEPF * 0.08;
};

export const calculateEmployerEPF = (grossSalaryForEPF) => {
    return grossSalaryForEPF * 0.12;
};

export const calculateEmployerETF = (grossSalaryForEPF) => {
    return grossSalaryForEPF * 0.03;
};

export const calculateAPIT = (grossEarnings) => {
    return (grossEarnings * 0.18) - 25500;
};

export const calculateNetSalary = (grossEarnings, employeeEPF, apit) => {
    return grossEarnings - employeeEPF - apit;
};

export const calculateCostToCompany = (grossEarnings, employerEPF, employerETF) => {
    return grossEarnings + employerEPF + employerETF;
};
