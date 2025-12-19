"use client"
import React, { useState } from 'react';
import { Users, Briefcase, Calendar, Clock, CheckCircle, XCircle, AlertCircle, Search, Filter, ChevronDown, ChevronUp, BarChart3, AlertTriangle } from 'lucide-react';
import { LuClockAlert } from "react-icons/lu";
import { FaListCheck } from "react-icons/fa6";
import { RiProgress1Line } from "react-icons/ri";

const EmployeeDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSupervisor, setFilterSupervisor] = useState('all');
  const [expandedEmployees, setExpandedEmployees] = useState<{ [key: number]: boolean }>({});
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [supervisorDropdownOpen, setSupervisorDropdownOpen] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);

  const [employees] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@company.com',
      position: 'Senior Developer',
      supervisor: 'Robert Juies',
      department: 'Engineering',
      avatar: 'JS',
      assignments: [
        { id: 1, title: 'Q4 Sales Report Development', startDate: '2024-12-01', endDate: '2024-12-20', status: 'Work In Progress', progress: 65 },
        { id: 2, title: 'Client Dashboard Implementation', startDate: '2024-12-01', endDate: '2024-12-25', status: 'Not Started', progress: 0 },
        { id: 3, title: 'API Documentation', startDate: '2024-11-20', endDate: '2024-12-05', status: 'Finished', progress: 100 },
        { id: 24, title: 'Code Review Process', startDate: '2024-12-10', endDate: '2024-12-28', status: 'Work In Progress', progress: 40 },
        { id: 25, title: 'Unit Testing Implementation', startDate: '2024-12-15', endDate: '2025-01-10', status: 'Not Started', progress: 0 },
        { id: 26, title: 'Performance Optimization', startDate: '2024-12-01', endDate: '2024-12-22', status: 'Work In Progress', progress: 75 },
      ]
    },
    {
      id: 2,
      name: 'Lisa Anderson',
      email: 'lisa.anderson@company.com',
      position: 'Full Stack Developer',
      supervisor: 'Robert Davinci',
      department: 'Engineering',
      avatar: 'LA',
      assignments: [
        { id: 4, title: 'Website Redesign Project', startDate: '2024-11-15', endDate: '2024-12-15', status: 'Delayed', progress: 45 },
        { id: 5, title: 'Payment Gateway Integration', startDate: '2024-12-05', endDate: '2024-12-18', status: 'Finished', progress: 100 },
        { id: 6, title: 'Security Audit Implementation', startDate: '2024-12-12', endDate: '2024-12-30', status: 'Work In Progress', progress: 30 },
        { id: 7, title: 'Mobile App Beta Testing', startDate: '2024-12-01', endDate: '2024-12-22', status: 'Work In Progress', progress: 55 },
        { id: 2, title: 'Client Dashboard Implementation', startDate: '2024-12-01', endDate: '2024-12-25', status: 'Not Started', progress: 0 },
      ]
    },
    {
      id: 3,
      name: 'Mark Wilson',
      email: 'mark.wilson@company.com',
      position: 'Marketing Manager',
      supervisor: 'Jennifer kub',
      department: 'Marketing',
      avatar: 'MW',
      assignments: [
        { id: 8, title: 'Q4 Marketing Campaign Launch', startDate: '2024-11-20', endDate: '2024-12-10', status: 'Finished', progress: 100 },
        { id: 9, title: 'Social Media Strategy 2025', startDate: '2024-12-01', endDate: '2024-12-22', status: 'Finished', progress: 100 },
      ]
    },
    {
      id: 4,
      name: 'Sarah Thompson',
      email: 'sarah.t@company.com',
      position: 'Product Designer',
      supervisor: 'Jennifer Dun',
      department: 'Design',
      avatar: 'ST',
      assignments: [
        { id: 10, title: 'User Interface Redesign', startDate: '2024-11-25', endDate: '2024-12-20', status: 'Work In Progress', progress: 80 },
        { id: 11, title: 'Design System Documentation', startDate: '2024-12-08', endDate: '2024-12-28', status: 'Work In Progress', progress: 35 },
        { id: 12, title: 'User Research Analysis', startDate: '2024-12-15', endDate: '2025-01-05', status: 'Work In Progress', progress: 25 },
      ]
    },
    {
      id: 5,
      name: 'Michael Chang',
      email: 'michael.c@company.com',
      position: 'Data Analyst',
      supervisor: 'Robert Davici',
      department: 'Engineering',
      avatar: 'MC',
      assignments: [
        { id: 13, title: 'Customer Analytics Dashboard', startDate: '2024-11-28', endDate: '2024-12-18', status: 'Delayed', progress: 35 },
        { id: 14, title: 'Monthly Performance Report', startDate: '2024-12-12', endDate: '2024-12-19', status: 'Work In Progress', progress: 60 },
      ]
    },
    {
      id: 6,
      name: 'Emily Roberts',
      email: 'emily.r@company.com',
      position: 'HR Specialist',
      supervisor: 'Jennifer kim',
      department: 'Human Resources',
      avatar: 'ER',
      assignments: [
        { id: 15, title: 'Employee Onboarding Program', startDate: '2024-11-15', endDate: '2024-12-08', status: 'Finished', progress: 100 },
        { id: 16, title: 'Annual Performance Reviews', startDate: '2024-12-01', endDate: '2024-12-30', status: 'Work In Progress', progress: 40 },
        { id: 17, title: 'Benefits Package Update', startDate: '2024-12-15', endDate: '2024-12-31', status: 'Not Started', progress: 0 },
      ]
    },
    {
      id: 7,
      name: 'David Kim',
      email: 'david.kim@company.com',
      position: 'Backend Developer',
      supervisor: 'Robert Davis',
      department: 'Engineering',
      avatar: 'DK',
      assignments: [
        { id: 18, title: 'Database Migration', startDate: '2024-12-20', endDate: '2025-01-10', status: 'Not Started', progress: 0 },
        { id: 19, title: 'API Performance Optimization', startDate: '2024-12-22', endDate: '2025-01-15', status: 'Not Started', progress: 0 },
        { id: 20, title: 'Server Maintenance', startDate: '2024-12-25', endDate: '2025-01-05', status: 'Not Started', progress: 0 },
      ]
    },
    {
      id: 8,
      name: 'Wennifer w',
      email: 'jennifer.b@company.com',
      position: 'Content Writer',
      supervisor: 'Jennifer Lee',
      department: 'Marketing',
      avatar: 'JB',
      assignments: [
        { id: 21, title: 'Blog Content Calendar', startDate: '2024-12-01', endDate: '2024-12-15', status: 'Not Started', progress: 0 },
        { id: 22, title: 'Product Launch Articles', startDate: '2024-12-05', endDate: '2024-12-20', status: 'Not Started', progress: 0 },
        { id: 23, title: 'SEO Optimization Review', startDate: '2024-12-10', endDate: '2024-12-25', status: 'Not Started', progress: 0 },
      ]
    },
    {
      id: 9,
      name: 'Zennifer Z',
      email: 'jennifer.b@company.com',
      position: 'Content Writer',
      supervisor: 'Jennifer mairu',
      department: 'Marketing',
      avatar: 'JB',
      assignments: [
        { id: 21, title: 'Blog Content Calendar', startDate: '2024-12-01', endDate: '2024-12-15', status: 'Not Started', progress: 0 },
        { id: 22, title: 'Product Launch Articles', startDate: '2024-12-05', endDate: '2024-12-20', status: 'Not Started', progress: 0 },
        { id: 23, title: 'SEO Optimization Review', startDate: '2024-12-10', endDate: '2024-12-25', status: 'Not Started', progress: 0 },
      ]
    },
    {
      id: 10,
      name: 'Yennifer y',
      email: 'jennifer.b@company.com',
      position: 'Content Writer',
      supervisor: 'Jennifer AA',
      department: 'Marketing',
      avatar: 'JB',
      assignments: [
        { id: 21, title: 'Blog Content Calendar', startDate: '2024-12-01', endDate: '2024-12-15', status: 'Not Started', progress: 0 },
        { id: 22, title: 'Product Launch Articles', startDate: '2024-12-05', endDate: '2024-12-20', status: 'Not Started', progress: 0 },
        { id: 23, title: 'SEO Optimization Review', startDate: '2024-12-10', endDate: '2024-12-25', status: 'Not Started', progress: 0 },
      ]
    },
    {
      id: 11,
      name: 'Uennifer u',
      email: 'jennifer.b@company.com',
      position: 'Content Writer',
      supervisor: 'Jennifer BB',
      department: 'Marketing',
      avatar: 'JB',
      assignments: [
        { id: 21, title: 'Blog Content Calendar', startDate: '2024-12-01', endDate: '2024-12-15', status: 'Not Started', progress: 0 },
        { id: 22, title: 'Product Launch Articles', startDate: '2024-12-05', endDate: '2024-12-20', status: 'Not Started', progress: 0 },
        { id: 23, title: 'SEO Optimization Review', startDate: '2024-12-10', endDate: '2024-12-25', status: 'Not Started', progress: 0 },
      ]
    },
    {
      id: 12,
      name: 'Qennifer q',
      email: 'jennifer.b@company.com',
      position: 'Content Writer',
      supervisor: 'Jennifer Cc',
      department: 'Marketing',
      avatar: 'JB',
      assignments: [
        { id: 21, title: 'Blog Content Calendar', startDate: '2024-12-01', endDate: '2024-12-15', status: 'Not Started', progress: 0 },
        { id: 22, title: 'Product Launch Articles', startDate: '2024-12-05', endDate: '2024-12-20', status: 'Not Started', progress: 0 },
        { id: 23, title: 'SEO Optimization Review', startDate: '2024-12-10', endDate: '2024-12-25', status: 'Not Started', progress: 0 },
      ]
    },
    {
      id: 13,
      name: 'Pennifer p',
      email: 'jennifer.b@company.com',
      position: 'Content Writer',
      supervisor: 'Jennifer DD',
      department: 'Marketing',
      avatar: 'JB',
      assignments: [
        { id: 21, title: 'Blog Content Calendar', startDate: '2024-12-01', endDate: '2024-12-15', status: 'Not Started', progress: 0 },
        { id: 22, title: 'Product Launch Articles', startDate: '2024-12-05', endDate: '2024-12-20', status: 'Not Started', progress: 0 },
        { id: 23, title: 'SEO Optimization Review', startDate: '2024-12-10', endDate: '2024-12-25', status: 'Not Started', progress: 0 },
      ]
    },
    {
      id: 14,
      name: 'Xennifer x',
      email: 'jennifer.b@company.com',
      position: 'Content Writer',
      supervisor: 'Jennifer EE',
      department: 'Marketing',
      avatar: 'JB',
      assignments: [
        { id: 21, title: 'Blog Content Calendar', startDate: '2024-12-01', endDate: '2024-12-15', status: 'Not Started', progress: 0 },
        { id: 22, title: 'Product Launch Articles', startDate: '2024-12-05', endDate: '2024-12-20', status: 'Not Started', progress: 0 },
        { id: 23, title: 'SEO Optimization Review', startDate: '2024-12-10', endDate: '2024-12-25', status: 'Not Started', progress: 0 },
      ]
    },
    
  ]);

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'Not Started': 'bg-gray-50 text-gray-600 border-gray-200',
      'Work In Progress': 'bg-blue-50 text-[#303f9f] border-[#303f9f]',
      'Finished': 'bg-green-50 text-green-700 border-green-200',
      'Delayed': 'bg-red-50 text-red-700 border-red-200',
    };
    return colors[status] || 'bg-gray-50 text-gray-600 border-gray-200';
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Finished':
        return <CheckCircle className="w-3.5 h-3.5" />;
      case 'Delayed':
        return <XCircle className="w-3.5 h-3.5" />;
      case 'Work In Progress':
        return <Clock className="w-3.5 h-3.5" />;
      default:
        return <AlertCircle className="w-3.5 h-3.5" />;
    }
  };

  const getEmployeeOverallStatus = (assignments: any[]) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const hasPendingStart = assignments.some(a => {
      if (a.status === 'Not Started') {
        const startDate = new Date(a.startDate);
        startDate.setHours(0, 0, 0, 0);
        return today > startDate;
      }
      return false;
    });
    
    if (assignments.some(a => a.status === 'Delayed')) return { status: 'Needs Attention', color: 'text-red-600' };
    if (hasPendingStart) return { status: 'Pending Start', color: 'text-[#e65c00]' };
    if (assignments.every(a => a.status === 'Finished')) return { status: 'All Complete', color: 'text-green-600' };
    if (assignments.some(a => a.status === 'Work In Progress')) return { status: 'On Track', color: 'text-[#303f9f]' };
    return { status: 'Not Started', color: 'text-gray-500' };
  };

  const calculateEmployeeProgress = (assignments: any[]) => {
    if (assignments.length === 0) return 0;
    const totalProgress = assignments.reduce((sum, a) => sum + a.progress, 0);
    return Math.round(totalProgress / assignments.length);
  };

  const supervisors = [...new Set(employees.map(e => e.supervisor))].sort((a, b) => a.localeCompare(b));

  const toggleEmployee = (employeeId: number) => {
    setExpandedEmployees(prev => ({
      ...prev,
      [employeeId]: !prev[employeeId]
    }));
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                     employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                     employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                     employee.assignments.some(a => a.title.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatusFilter = filterStatus === 'all' || 
                                employee.assignments.some(a => a.status === filterStatus);
    const matchesSupervisor = filterSupervisor === 'all' || employee.supervisor === filterSupervisor;
    return matchesSearch && matchesStatusFilter && matchesSupervisor;
  }).sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  const stats = {
    totalEmployees: employees.length,
    totalAssignments: employees.reduce((sum, emp) => sum + emp.assignments.length, 0),
    notStarted: employees.reduce((sum, emp) => sum + emp.assignments.filter(a => a.status === 'Not Started').length, 0),
    inProgress: employees.reduce((sum, emp) => sum + emp.assignments.filter(a => a.status === 'Work In Progress').length, 0),
    inProgressTotalProgress: (() => {
      const wipAssignments = employees.flatMap(emp => emp.assignments.filter(a => a.status === 'Work In Progress'));
      if (wipAssignments.length === 0) return 0;
      const totalProgress = wipAssignments.reduce((sum, a) => sum + a.progress, 0);
      const maxProgress = wipAssignments.length * 100;
      return Math.round((totalProgress / maxProgress) * 100);
    })(),
    finished: employees.reduce((sum, emp) => sum + emp.assignments.filter(a => a.status === 'Finished').length, 0),
    delayed: employees.reduce((sum, emp) => sum + emp.assignments.filter(a => a.status === 'Delayed').length, 0),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-gradient-to-r from-[#2c2c2c] to-[#1a1a1a] shadow-xl">
        <div className="max-w-7xl mx-auto px-8 py-10">
          <div>
            <h1 className="text-4xl font-extralight text-white tracking-wide mb-1">
              Employee Assignment Dashboard
            </h1>
            <p className="text-gray-300 mt-3 font-light text-sm">Track and manage employee assignments and progress</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-5 mb-10">
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs font-light uppercase tracking-wider mb-3">Employees</p>
                <p className="text-4xl font-extralight text-[#e65c00]">{stats.totalEmployees}</p>
              </div>
              <div className="bg-[#e65c00]/10 rounded-full p-3">
                <Users className="w-7 h-7 text-[#e65c00]" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs font-light uppercase tracking-wider mb-3">Total Tasks</p>
                <p className="text-4xl font-extralight text-[#2c2c2c]">{stats.totalAssignments}</p>
              </div>
              <div className="bg-gray-100 rounded-full p-3">
                <Briefcase className="w-7 h-7 text-gray-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs font-light uppercase tracking-wider mb-3">Not Started</p>
                <p className="text-4xl font-extralight text-gray-600">{stats.notStarted}</p>
              </div>
              <div className="bg-gray-100 rounded-full p-3">
                <AlertCircle className="w-7 h-7 text-gray-500" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs font-light uppercase tracking-wider mb-3">In Progress</p>
                <p className="text-4xl font-extralight text-[#5b7c99]">{stats.inProgressTotalProgress}%</p>
                <p className="text-xs text-gray-400 mt-1 font-light">{stats.inProgress} overall</p>
              </div>
              <div className="bg-[#5b7c99]/10 rounded-full p-3">
                <Clock className="w-7 h-7 text-[#5b7c99]" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs font-light uppercase tracking-wider mb-3">Finished</p>
                <p className="text-4xl font-extralight text-green-600">{stats.finished}</p>
              </div>
              <div className="bg-green-50 rounded-full p-3">
                <CheckCircle className="w-7 h-7 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs font-light uppercase tracking-wider mb-3">Delayed</p>
                <p className="text-4xl font-extralight text-red-600">{stats.delayed}</p>
              </div>
              <div className="bg-red-50 rounded-full p-3">
                <XCircle className="w-7 h-7 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-7 mb-10 border border-gray-100">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  suppressHydrationWarning
                  type="text"
                  placeholder="Search by name, position, department, or assignment..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#314555] focus:ring-2 focus:ring-[#314555]/20 transition font-light"
                />
              </div>
              <button
                suppressHydrationWarning
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="px-6 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center gap-2 font-light"
                title={sortOrder === 'asc' ? 'Sort Z-A' : 'Sort A-Z'}
              >
                <BarChart3 className="w-4 h-4 text-gray-600" />
                <span className="text-gray-700">{sortOrder === 'asc' ? 'A-Z' : 'Z-A'}</span>
              </button>
              <div className="relative">
                <button
                  suppressHydrationWarning
                  onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
                  className="pl-11 pr-10 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#314555] focus:ring-2 focus:ring-[#314555]/20 bg-white cursor-pointer font-light hover:border-gray-300 transition-all min-w-[200px] flex items-center justify-between text-left"
                >
                  <span className="truncate">
                    {filterStatus === 'all' ? 'All Status' : filterStatus}
                  </span>
                </button>
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none z-10" />
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                
                {statusDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-20" 
                      onClick={() => setStatusDropdownOpen(false)}
                    />
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-30">
                      <button
                        suppressHydrationWarning
                        onClick={() => {
                          setFilterStatus('all');
                          setStatusDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors font-light first:rounded-t-lg ${
                          filterStatus === 'all' ? 'bg-blue-50 text-[#303f9f]' : 'text-gray-700'
                        }`}
                      >
                        All Status
                      </button>
                      <button
                        suppressHydrationWarning
                        onClick={() => {
                          setFilterStatus('Not Started');
                          setStatusDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors font-light ${
                          filterStatus === 'Not Started' ? 'bg-blue-50 text-[#303f9f]' : 'text-gray-700'
                        }`}
                      >
                        Not Started
                      </button>
                      <button
                        suppressHydrationWarning
                        onClick={() => {
                          setFilterStatus('Work In Progress');
                          setStatusDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors font-light ${
                          filterStatus === 'Work In Progress' ? 'bg-blue-50 text-[#303f9f]' : 'text-gray-700'
                        }`}
                      >
                        Work In Progress
                      </button>
                      <button
                        suppressHydrationWarning
                        onClick={() => {
                          setFilterStatus('Finished');
                          setStatusDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors font-light ${
                          filterStatus === 'Finished' ? 'bg-blue-50 text-[#303f9f]' : 'text-gray-700'
                        }`}
                      >
                        Finished
                      </button>
                      <button
                        suppressHydrationWarning
                        onClick={() => {
                          setFilterStatus('Delayed');
                          setStatusDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors font-light last:rounded-b-lg ${
                          filterStatus === 'Delayed' ? 'bg-blue-50 text-[#303f9f]' : 'text-gray-700'
                        }`}
                      >
                        Delayed
                      </button>
                    </div>
                  </>
                )}
              </div>
              <div className="relative">
                <button
                  suppressHydrationWarning
                  onClick={() => setSupervisorDropdownOpen(!supervisorDropdownOpen)}
                  className="pl-11 pr-10 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#314555] focus:ring-2 focus:ring-[#314555]/20 bg-white cursor-pointer font-light hover:border-gray-300 transition-all min-w-[200px] flex items-center justify-between text-left"
                >
                  <span className="truncate">
                    {filterSupervisor === 'all' ? 'All Supervisors' : filterSupervisor}
                  </span>
                </button>
                <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none z-10" />
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                
                {supervisorDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-20" 
                      onClick={() => setSupervisorDropdownOpen(false)}
                    />
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-30 max-h-60 overflow-y-auto">
                      <button
                        suppressHydrationWarning
                        onClick={() => {
                          setFilterSupervisor('all');
                          setSupervisorDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors font-light first:rounded-t-lg ${
                          filterSupervisor === 'all' ? 'bg-blue-50 text-[#303f9f]' : 'text-gray-700'
                        }`}
                      >
                        All Supervisors
                      </button>
                      {supervisors.map(supervisor => (
                        <button
                          suppressHydrationWarning
                          key={supervisor}
                          onClick={() => {
                            setFilterSupervisor(supervisor);
                            setSupervisorDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors font-light last:rounded-b-lg ${
                            filterSupervisor === supervisor ? 'bg-blue-50 text-[#303f9f]' : 'text-gray-700'
                          }`}
                        >
                          {supervisor}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="columns-1 lg:columns-2 gap-7 space-y-7">
          {filteredEmployees.map((employee) => {
            const overallStatus = getEmployeeOverallStatus(employee.assignments);
            const overallProgress = calculateEmployeeProgress(employee.assignments);
            const isExpanded = expandedEmployees[employee.id] || false;
            const filteredAssignments = employee.assignments.filter(assignment =>
              searchTerm === '' || assignment.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            
            return (
              <div key={employee.id} className="break-inside-avoid mb-7 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="bg-gradient-to-r from-[#e0ecf8] to-[#d5e5f5] px-8 py-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-6 mb-3">
                        <div className="w-16 h-16 bg-white shadow-md rounded-lg flex items-center justify-center text-[#314555] font-light text-xl">
                          {employee.avatar}
                        </div>
                        <div>
                          <h3 className="text-2xl font-extralight text-[#2c2c2c] mb-1">{employee.name}</h3>
                          <p className="text-[#314555] text-sm font-light mb-1">{employee.position} • {employee.department}</p>
                          <p className="text-gray-600 text-xs font-light">{employee.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-white/50 rounded-full px-4 py-1.5 inline-flex">
                        <Users className="w-4 h-4 text-[#314555]" />
                        <span className="font-light text-[#314555] text-sm">Supervisor: {employee.supervisor}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 justify-end mb-3">
                        {overallStatus.status === 'Pending Start' && (
                          <LuClockAlert className="w-5 h-5 text-[#e65c00]" />
                        )}
                        {overallStatus.status === 'Needs Attention' && (
                          <AlertTriangle className="w-5 h-5 text-red-500" />
                        )}
                        {overallStatus.status === 'All Complete' && (
                          <FaListCheck className="w-5 h-5 text-green-500" />
                        )}
                        {overallStatus.status === 'On Track' && (
                          <RiProgress1Line className="w-5 h-5 text-blue-500" />
                        )}
                        <p className={`text-sm font-light ${overallStatus.color === 'text-red-600' ? 'text-red-600' : overallStatus.color === 'text-green-600' ? 'text-green-600' : overallStatus.color === 'text-[#e65c00]' ? 'text-[#e65c00]' : 'text-[#303f9f]'}`}>
                          {overallStatus.status}
                        </p>
                      </div>
                      <div className="bg-white/60 rounded-lg p-3 inline-block">
                        <p className="text-gray-600 text-xs font-light mb-1">Overall Progress</p>
                        <p className="text-4xl font-extralight text-[#2c2c2c]">{overallProgress}%</p>
                      </div>
                    </div>
                  </div>
                </div>

                {!isExpanded && (
                  <div className="px-8 py-5 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                    <div className="flex items-center gap-5 flex-wrap">
                      {(() => {
                        const wipAssignments = employee.assignments.filter(a => a.status === 'Work In Progress');
                        if (wipAssignments.length > 0) {
                          const totalProgress = wipAssignments.reduce((sum, a) => sum + a.progress, 0);
                          const maxProgress = wipAssignments.length * 100;
                          const overallProgress = Math.round((totalProgress / maxProgress) * 100);
                          return (
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="w-4 h-4 text-[#303f9f]" />
                              <span className="font-light text-gray-600">Work In Progress</span>
                              <span className="font-normal text-[#303f9f]">{overallProgress}%</span>
                            </div>
                          );
                        }
                        return null;
                      })()}
                      
                      {(() => {
                        const notStartedCount = employee.assignments.filter(a => a.status === 'Not Started').length;
                        if (notStartedCount > 0) {
                          return (
                            <div className="flex items-center gap-2 text-sm">
                              <AlertCircle className="w-4 h-4 text-gray-400" />
                              <span className="font-light text-gray-600">Not Started</span>
                              <span className="font-normal text-gray-600">{notStartedCount}</span>
                            </div>
                          );
                        }
                        return null;
                      })()}
                      
                      {(() => {
                        const finishedCount = employee.assignments.filter(a => a.status === 'Finished').length;
                        if (finishedCount > 0) {
                          return (
                            <div className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="font-light text-gray-600">Finished</span>
                              <span className="font-normal text-green-600">{finishedCount}</span>
                            </div>
                          );
                        }
                        return null;
                      })()}
                      
                      {(() => {
                        const delayedCount = employee.assignments.filter(a => a.status === 'Delayed').length;
                        if (delayedCount > 0) {
                          return (
                            <div className="flex items-center gap-2 text-sm">
                              <XCircle className="w-4 h-4 text-red-500" />
                              <span className="font-light text-gray-600">Delayed</span>
                              <span className="font-normal text-red-600">{delayedCount}</span>
                            </div>
                          );
                        }
                        return null;
                      })()}
                    </div>
                  </div>
                )}

                <div className="px-8 py-4 bg-gradient-to-r from-white to-gray-50">
                  <button
                    suppressHydrationWarning
                    onClick={() => toggleEmployee(employee.id)}
                    className="w-full flex items-center justify-between text-left hover:bg-white/80 transition-all px-5 py-3 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Briefcase className="w-5 h-5 text-gray-600" />
                      <span className="font-light text-gray-700 text-base">
                        Assignments ({filteredAssignments.length})
                      </span>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                </div>

                {isExpanded && (
                  <div className="p-8 bg-gradient-to-br from-white to-gray-50">
                    <div className="space-y-5 max-h-96 overflow-y-auto pr-2">
                      {filteredAssignments.length > 0 ? (
                        filteredAssignments.map((assignment) => (
                          <div key={assignment.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:border-gray-300 hover:shadow-md transition-all">
                            <div className="flex items-start justify-between mb-5">
                              <div className="flex-1">
                                <h5 className="font-light text-[#2c2c2c] text-base mb-4">{assignment.title}</h5>
                                <div className="flex items-center gap-6 text-xs text-gray-500">
                                  <div className="flex items-center gap-2 bg-gray-50 rounded-full px-3 py-1.5">
                                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                    <span className="font-light">Start:</span>
                                    <span className="font-normal">{assignment.startDate}</span>
                                  </div>
                                  <div className="flex items-center gap-2 bg-gray-50 rounded-full px-3 py-1.5">
                                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                    <span className="font-light">End:</span>
                                    <span className="font-normal">{assignment.endDate}</span>
                                  </div>
                                </div>
                              </div>
                              <span className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-light border rounded-full ${getStatusColor(assignment.status)}`}>
                                {getStatusIcon(assignment.status)}
                                {assignment.status}
                              </span>
                            </div>
                            
                            <div className="mt-5">
                              <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-light text-gray-500">Progress</span>
                                <span className="text-xs font-normal text-[#5b7c99]">{assignment.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full transition-all duration-500 rounded-full ${
                                    assignment.status === 'Finished' ? 'bg-gradient-to-r from-green-500 to-green-600' :
                                    assignment.status === 'Delayed' ? 'bg-gradient-to-r from-red-500 to-red-600' :
                                    assignment.status === 'Work In Progress' ? 'bg-gradient-to-r from-[#303f9f] to-[#5b7c99]' :
                                    'bg-gray-300'
                                  }`}
                                  style={{ width: `${assignment.progress}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-16 text-gray-400">
                          <Search className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                          <p className="font-light text-lg">No assignments found matching your search</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredEmployees.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-20 text-center border border-gray-100">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-5" />
            <h3 className="text-xl font-light text-gray-700 mb-3">No employees found</h3>
            <p className="text-gray-500 font-light">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;