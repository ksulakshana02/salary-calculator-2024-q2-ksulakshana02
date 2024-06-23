"use client"
import { useState } from 'react';
import {
    calculateTotalEarnings,
    calculateTotalEarningsForEPF,
    calculateGrossDeduction,
    calculateGrossEarnings,
    calculateGrossSalaryForEPF,
    calculateEmployeeEPF,
    calculateEmployerEPF,
    calculateEmployerETF,
    calculateAPIT,
    calculateNetSalary,
    calculateCostToCompany,
} from '@/utils/salaryCalculator';

export default function HomePage() {
    const [basicSalary, setBasicSalary] = useState(0);
    const [earnings, setEarnings] = useState([]);
    const [deductions, setDeductions] = useState([]);

    // handle changes in Basic Salary input
    const handleBasicSalaryChange = (event) => {
        setBasicSalary(parseInt(event.target.value, 10));
    };

    //  handle changes in Basic Salary input
    const handleEarningChange = (index, value, epfEtf, checked) => {
        const updatedEarnings = [...earnings];
        updatedEarnings[index] = {
            type: 'earning',
            value,
            epfEtf,
            checked,
        };
        setEarnings(updatedEarnings);
    };

    //  handle changes in Basic Salary input
    const handleDeductionChange = (index, value, checked) => {
        const updatedDeductions = [...deductions];
        updatedDeductions[index] = {
            type: 'deduction',
            value,
            checked,
        };
        setDeductions(updatedDeductions);
    };

    // add a new earning item to the list
    const addEarning = () => {
        setEarnings([
            ...earnings,
            { type: 'earning', value: 0, epfEtf: false, checked: false },
        ]);
    };

    // add a new deduction item to the list
    const addDeduction = () => {
        setDeductions([
            ...deductions,
            { type: 'deduction', value: 0, checked: false },
        ]);
    };

    // remove an earning item from the list
    const removeEarning = (index) => {
        const updatedEarnings = [...earnings];
        updatedEarnings.splice(index, 1);
        setEarnings(updatedEarnings);
    };

    // remove a deduction item from the list
    const removeDeduction = (index) => {
        const updatedDeductions = [...deductions];
        updatedDeductions.splice(index, 1);
        setDeductions(updatedDeductions);
    };

    // reset all form inputs to their initial state
    const resetForm = () => {
        setBasicSalary(0);
        setEarnings([]);
        setDeductions([]);
    };


    //Calculate various components of the salary based on current inputs
    const totalEarnings = calculateTotalEarnings(basicSalary, earnings);
    const totalEarningsForEPF = calculateTotalEarningsForEPF(basicSalary, earnings);
    const grossDeduction = calculateGrossDeduction(deductions);
    const grossEarnings = calculateGrossEarnings(totalEarnings, grossDeduction);
    const grossSalaryForEPF = calculateGrossSalaryForEPF(totalEarningsForEPF, grossDeduction);
    const employeeEPF = calculateEmployeeEPF(grossSalaryForEPF);
    const employerEPF = calculateEmployerEPF(grossSalaryForEPF);
    const employerETF = calculateEmployerETF(grossSalaryForEPF);
    const apit = calculateAPIT(grossEarnings);
    const netSalary = calculateNetSalary(grossEarnings, employeeEPF, apit);
    const costToCompany = calculateCostToCompany(grossEarnings, employerEPF, employerETF);


    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Panel: Input Form */}
                    <div className="bg-gray-50 rounded-lg shadow-md">
                        <div className="flex justify-between">
                            <h1 className="text-xl text-gray-900 py-4 px-6 font-bold">Calculate Your Salary</h1>
                            <div
                                onClick={resetForm}
                                className="flex mt-4 px-4 mx-4 py-1 cursor-pointer"
                            >
                                <svg width="14" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21.0001 9C21.0001 13.9706 16.9707 18 12.0001 18C10.1525 18.0061 8.34893 17.4363 6.8401 16.37C6.71954 16.2831 6.64286 16.148 6.6301 16C6.61816 15.8559 6.66922 15.7136 6.7701 15.61L7.4901 14.88C7.65911 14.7127 7.92255 14.6876 8.1201 14.82C9.2663 15.5925 10.6179 16.0036 12.0001 16C15.8661 16 19.0001 12.866 19.0001 9C19.0001 5.13401 15.8661 2 12.0001 2C8.1341 2 5.0001 5.13401 5.0001 9H7.3601C7.49568 8.99803 7.62602 9.05234 7.7201 9.15L7.9201 9.35C8.01475 9.44388 8.068 9.57168 8.068 9.705C8.068 9.83832 8.01475 9.96612 7.9201 10.06L4.3901 13.6C4.19228 13.7918 3.87791 13.7918 3.6801 13.6L0.150096 10.06C0.0554401 9.96612 0.00219727 9.83832 0.00219727 9.705C0.00219727 9.57168 0.0554401 9.44388 0.150096 9.35L0.350096 9.15C0.444172 9.05234 0.574511 8.99803 0.710096 9H3.0001C3.0001 4.02944 7.02953 0 12.0001 0C16.9707 0 21.0001 4.02944 21.0001 9Z" fill="#0052EA" />
                                </svg>
                                <p className="text-blue-600 mx-2 font-normal text-sm">Reset</p>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="mb-6">
                                <h2 className="text-base text-black font-semibold mb-2">Basic Salary</h2>
                                <input
                                    type="number"
                                    value={basicSalary}
                                    onChange={handleBasicSalaryChange}
                                    className="w-min px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <h2 className="text-base font-semibold text-black">Earnings</h2>
                                <p className="text-gray-600 mb-6 font-normal text-xs">Allowance, Fixed Allowance, Bonus and etc.</p>
                                <ul>
                                    {/* Dynamic list of Earnings items */}
                                    {earnings.map((earning, index) => (
                                        <li key={index} className="flex items-center mb-2">
                                            <input type="text"
                                                placeholder="Earnings Name"
                                                className="w-full px-3 mr-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <input
                                                type="number"
                                                placeholder="Earning Amount"
                                                value={earning.value}
                                                onChange={(event) =>
                                                    handleEarningChange(index, event.target.value, earning.epfEtf, earning.checked)
                                                }
                                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <input
                                                type="checkbox"
                                                checked={earning.epfEtf}
                                                onChange={(event) =>
                                                    handleEarningChange(index, earning.value, event.target.checked, earning.checked)
                                                }
                                                className="ml-2"
                                            />
                                            <span className="ml-2">EPF/ETF</span>
                                            <div
                                                onClick={() => removeEarning(index)}
                                                className="ml-2 px-2 py-1 bg-gray-200 rounded-full items-center cursor-pointer"
                                            >
                                                <svg width="20" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M17.8499 16.44C17.9445 16.5339 17.9978 16.6617 17.9978 16.795C17.9978 16.9283 17.9445 17.0561 17.8499 17.15L17.1499 17.85C17.056 17.9446 16.9282 17.9979 16.7949 17.9979C16.6615 17.9979 16.5337 17.9446 16.4399 17.85L11.9999 13.41L7.55985 17.85C7.46597 17.9446 7.33817 17.9979 7.20485 17.9979C7.07153 17.9979 6.94374 17.9446 6.84985 17.85L6.14985 17.15C6.0552 17.0561 6.00195 16.9283 6.00195 16.795C6.00195 16.6617 6.0552 16.5339 6.14985 16.44L10.5899 12L6.14985 7.55997C6.0552 7.46609 6.00195 7.33829 6.00195 7.20497C6.00195 7.07166 6.0552 6.94386 6.14985 6.84997L6.84985 6.14997C6.94374 6.05532 7.07153 6.00208 7.20485 6.00208C7.33817 6.00208 7.46597 6.05532 7.55985 6.14997L11.9999 10.59L16.4399 6.14997C16.5337 6.05532 16.6615 6.00208 16.7949 6.00208C16.9282 6.00208 17.056 6.05532 17.1499 6.14997L17.8499 6.84997C17.9445 6.94386 17.9978 7.07166 17.9978 7.20497C17.9978 7.33829 17.9445 7.46609 17.8499 7.55997L13.4099 12L17.8499 16.44Z" fill="#212121" />
                                                </svg>

                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <div
                                    onClick={addEarning}
                                    className="py-2 rounded-md cursor-pointer flex"
                                >
                                    <svg width="20" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_3918_19)">
                                            <path d="M19 11.5V12.5C19 12.6326 18.9473 12.7598 18.8536 12.8536C18.7598 12.9473 18.6326 13 18.5 13H13V18.5C13 18.6326 12.9473 18.7598 12.8536 18.8536C12.7598 18.9473 12.6326 19 12.5 19H11.5C11.3674 19 11.2402 18.9473 11.1464 18.8536C11.0527 18.7598 11 18.6326 11 18.5V13H5.5C5.36739 13 5.24021 12.9473 5.14645 12.8536C5.05268 12.7598 5 12.6326 5 12.5V11.5C5 11.3674 5.05268 11.2402 5.14645 11.1464C5.24021 11.0527 5.36739 11 5.5 11H11V5.5C11 5.36739 11.0527 5.24021 11.1464 5.14645C11.2402 5.05268 11.3674 5 11.5 5H12.5C12.6326 5 12.7598 5.05268 12.8536 5.14645C12.9473 5.24021 13 5.36739 13 5.5V11H18.5C18.6326 11 18.7598 11.0527 18.8536 11.1464C18.9473 11.2402 19 11.3674 19 11.5Z" fill="#0052EA" />
                                        </g>
                                    </svg>
                                    <text className="text-sm font-medium text-blue-600 mx-1">Add New Allowance</text>
                                </div>
                            </div>
                            <hr className="my-6 " />
                            <div className="mb-4">
                                <h2 className="text-base font-semibold text-black">Deductions</h2>
                                <p className="text-gray-600 mb-6 font-normal text-xs">Salary Advances, Loan Deductions and all</p>
                                <ul>
                                    {/* Dynamic list of Deductions items */}
                                    {deductions.map((deduction, index) => (
                                        <li key={index} className="flex items-center mb-2">
                                            <input type="text"
                                                placeholder="Deductions"
                                                className="w-full mr-2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <input
                                                type="number"
                                                placeholder="Deduction Amount"
                                                value={deduction.value}
                                                onChange={(event) =>
                                                    handleDeductionChange(index, event.target.value, deduction.checked)
                                                }
                                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <div
                                                onClick={() => removeDeduction(index)}
                                                className="ml-2 px-2 py-1 bg-gray-200 rounded-full items-center cursor-pointer"
                                            >
                                                <svg width="20" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M17.8499 16.44C17.9445 16.5339 17.9978 16.6617 17.9978 16.795C17.9978 16.9283 17.9445 17.0561 17.8499 17.15L17.1499 17.85C17.056 17.9446 16.9282 17.9979 16.7949 17.9979C16.6615 17.9979 16.5337 17.9446 16.4399 17.85L11.9999 13.41L7.55985 17.85C7.46597 17.9446 7.33817 17.9979 7.20485 17.9979C7.07153 17.9979 6.94374 17.9446 6.84985 17.85L6.14985 17.15C6.0552 17.0561 6.00195 16.9283 6.00195 16.795C6.00195 16.6617 6.0552 16.5339 6.14985 16.44L10.5899 12L6.14985 7.55997C6.0552 7.46609 6.00195 7.33829 6.00195 7.20497C6.00195 7.07166 6.0552 6.94386 6.14985 6.84997L6.84985 6.14997C6.94374 6.05532 7.07153 6.00208 7.20485 6.00208C7.33817 6.00208 7.46597 6.05532 7.55985 6.14997L11.9999 10.59L16.4399 6.14997C16.5337 6.05532 16.6615 6.00208 16.7949 6.00208C16.9282 6.00208 17.056 6.05532 17.1499 6.14997L17.8499 6.84997C17.9445 6.94386 17.9978 7.07166 17.9978 7.20497C17.9978 7.33829 17.9445 7.46609 17.8499 7.55997L13.4099 12L17.8499 16.44Z" fill="#212121" />
                                                </svg>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <div
                                    onClick={addDeduction}
                                    className="py-2 rounded-md cursor-pointer flex"
                                >
                                    <svg width="20" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_3918_19)">
                                            <path d="M19 11.5V12.5C19 12.6326 18.9473 12.7598 18.8536 12.8536C18.7598 12.9473 18.6326 13 18.5 13H13V18.5C13 18.6326 12.9473 18.7598 12.8536 18.8536C12.7598 18.9473 12.6326 19 12.5 19H11.5C11.3674 19 11.2402 18.9473 11.1464 18.8536C11.0527 18.7598 11 18.6326 11 18.5V13H5.5C5.36739 13 5.24021 12.9473 5.14645 12.8536C5.05268 12.7598 5 12.6326 5 12.5V11.5C5 11.3674 5.05268 11.2402 5.14645 11.1464C5.24021 11.0527 5.36739 11 5.5 11H11V5.5C11 5.36739 11.0527 5.24021 11.1464 5.14645C11.2402 5.05268 11.3674 5 11.5 5H12.5C12.6326 5 12.7598 5.05268 12.8536 5.14645C12.9473 5.24021 13 5.36739 13 5.5V11H18.5C18.6326 11 18.7598 11.0527 18.8536 11.1464C18.9473 11.2402 19 11.3674 19 11.5Z" fill="#0052EA" />
                                        </g>
                                    </svg>
                                    <text className="text-sm font-medium text-blue-600 mx-1">Add New Deduction</text>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* Right Panel: Calculation Results */}
                    <div className="bg-white border-2 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold text-black py-4 px-6">Your salary</h2>
                        <div className="p-6">
                            <table className="w-full text-left text-gray-500 justify-items-end">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-3 font-semibold text-sm text-gray-400">Items</th>
                                        <th className="px-4 py-3 font-semibold text-sm text-gray-400 text-right">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="px-4 py-2 font-normal text-base text-black">Basic Salary</td>
                                        <td className="px-4 py-2 font-normal text-base text-black text-right">{basicSalary}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 font-normal text-base text-black">Gross Earning</td>
                                        <td className="px-4 py-2 font-normal text-base text-black text-right">{totalEarnings}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 font-normal text-base text-black">Gross Deduction</td>
                                        <td className="px-4 py-2 font-normal text-base text-black text-right">- {grossDeduction}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 font-normal text-base text-black">Employee EPF (8%)</td>
                                        <td className="px-4 py-2 font-normal text-base text-black text-right">- {employeeEPF}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 font-normal text-base text-black">APIT</td>
                                        <td className="px-4 py-2 font-normal text-base text-black text-right">- {apit}</td>
                                    </tr>
                                    <tr className="border-2 rounded">
                                        <td className="px-4 py-2 font-semibold text-base text-black">Net Salary (Take Home)</td>
                                        <td className="px-4 py-2 font-semibold text-base text-black text-right">{netSalary}</td>
                                    </tr>
                                </tbody>
                                <thead>
                                    <tr>
                                        <th className="px-4 py-3 font-semibold text-sm text-gray-400">Contribution from the Employer</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="px-4 py-2 font-normal text-base text-black">Employeer EPF (12%)</td>
                                        <td className="px-4 py-2 font-normal text-base text-black text-right">{employerEPF}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 font-normal text-base text-black">Employeer ETF (3%)</td>
                                        <td className="px-4 py-2 font-normal text-base text-black text-right">{employerETF}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 font-normal text-base text-black">CTC (Cost to Company)</td>
                                        <td className="px-4 py-2 font-normal text-base text-black text-right">{costToCompany}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}





