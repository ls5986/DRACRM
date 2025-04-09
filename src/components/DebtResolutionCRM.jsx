import React, { useState, useEffect } from 'react';
import { 
  User, 
  CreditCard, 
  DollarSign, 
  File, 
  Home, 
  Settings, 
  Bell, 
  BarChart, 
  Search, 
  Filter, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  ExternalLink,
  Users,
  Calendar,
  Clock,
  ChevronDown,
  TrendingUp,
  Award,
  Target,
  Briefcase,
  Shield,
  UserPlus,
  Key,
  Lock,
  Unlock,
  Plus,
  Edit,
  Trash2,
  Check,
  X,
  Zap,
  ArrowRight
} from 'lucide-react';

// Main application component
export default function DebtResolutionCRM() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentClient, setCurrentClient] = useState(null);
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [notificationCount, setNotificationCount] = useState(5);
  const [backendOptions] = useState(['Cordoba', 'Achieve', 'Freedom Debt Relief', 'National Debt Relief']);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCreditPull, setShowCreditPull] = useState(false);
  const [showDecisionEngine, setShowDecisionEngine] = useState(false);
  const [clientDecision, setClientDecision] = useState(null);
  const [newNote, setNewNote] = useState('');
  
  // New state variables for sales functionality
  const [salesReps, setSalesReps] = useState([]);
  const [teams, setTeams] = useState([]);
  const [deals, setDeals] = useState([]);
  const [commissionTiers, setCommissionTiers] = useState([]);
  const [salesMetrics, setSalesMetrics] = useState([]);
  const [salesTargets, setSalesTargets] = useState([]);
  
  // New state variables for admin functionality
  const [isAdmin, setIsAdmin] = useState(true); // For demo purposes, set to true
  const [showAddRepModal, setShowAddRepModal] = useState(false);
  const [showAddTeamModal, setShowAddTeamModal] = useState(false);
  const [selectedRep, setSelectedRep] = useState(null);
  const [permissions, setPermissions] = useState({
    canManageTeams: true,
    canViewAllClients: true,
    canManageCommissions: true,
    canViewReports: true,
    canManageBackends: true
  });
  
  // New state variables for client management
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [showEditClientModal, setShowEditClientModal] = useState(false);
  const [showAddDebtModal, setShowAddDebtModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    totalDebt: 0,
    status: 'new',
    dateAdded: new Date().toISOString().split('T')[0],
    lastContact: new Date().toISOString().split('T')[0],
    creditScore: null,
    debtDetails: [],
    notes: [],
    income: 0,
    expenses: 0,
    assignedTo: '',
    recommendedBackend: null,
    enrolledBackend: null,
    enrollmentDate: null,
    qualificationStatus: 'pending',
    qualificationNotes: '',
    monthlyPayment: 0,
    programLength: 0
  });
  
  // New state variables for decision engine
  const [decisionResults, setDecisionResults] = useState(null);
  const [showRoutingModal, setShowRoutingModal] = useState(false);
  const [selectedBackend, setSelectedBackend] = useState(null);

  // Decision engine criteria
  const decisionCriteria = {
    creditScore: {
      excellent: 720,
      good: 670,
      fair: 580
    },
    debtAmount: {
      high: 50000,
      medium: 30000,
      low: 10000
    },
    dti: {
      high: 0.5,
      medium: 0.35,
      low: 0.25
    }
  };

  // Backend routing rules
  const routingRules = [
    {
      id: 1,
      name: 'High Debt, Low Credit',
      conditions: {
        minDebt: 50000,
        maxCreditScore: 580,
        minDti: 0.5
      },
      backend: 'Cordoba',
      priority: 1,
      description: 'Best for clients with high debt and low credit scores'
    },
    {
      id: 2,
      name: 'Moderate Debt, Good Credit',
      conditions: {
        minDebt: 30000,
        maxCreditScore: 670,
        minDti: 0.35
      },
      backend: 'Achieve',
      priority: 2,
      description: 'Ideal for clients with moderate debt and good credit'
    },
    {
      id: 3,
      name: 'Low Debt, Excellent Credit',
      conditions: {
        minDebt: 10000,
        maxCreditScore: 720,
        minDti: 0.25
      },
      backend: 'National Debt Relief',
      priority: 3,
      description: 'Perfect for clients with lower debt and excellent credit'
    }
  ];

  // Load sample data
  useEffect(() => {
    // Sample sales representatives
    const sampleSalesReps = [
      {
        id: 'SR001',
        name: 'Sarah Jenkins',
        userId: 'U001',
        hireDate: '2024-01-15',
        employmentStatus: 'Active',
        commissionTier: 'Tier2',
        manager: 'David Wilson',
        teamId: 'T001',
        payrollId: 'PAY001',
        phoneExtension: '101',
        defaultCommissionRate: 0.15,
        ytdSales: 1250000,
        ytdCommission: 187500
      },
      {
        id: 'SR002',
        name: 'Michael Chen',
        userId: 'U002',
        hireDate: '2024-02-01',
        employmentStatus: 'Active',
        commissionTier: 'Tier1',
        manager: 'David Wilson',
        teamId: 'T001',
        payrollId: 'PAY002',
        phoneExtension: '102',
        defaultCommissionRate: 0.10,
        ytdSales: 850000,
        ytdCommission: 85000
      }
    ];

    // Sample teams
    const sampleTeams = [
      {
        id: 'T001',
        teamName: 'East Coast Sales',
        managerId: 'U003',
        teamTarget: 5000000,
        teamType: 'Sales',
        region: 'Northeast',
        createdDate: '2024-01-01',
        isActive: true
      }
    ];

    // Sample commission tiers
    const sampleCommissionTiers = [
      {
        id: 'Tier1',
        tierName: 'Entry Level',
        minimumSales: 0,
        maximumSales: 1000000,
        commissionPercentage: 0.10,
        bonusAmount: 5000,
        isActive: true,
        effectiveDate: '2024-01-01'
      },
      {
        id: 'Tier2',
        tierName: 'Senior Level',
        minimumSales: 1000000,
        maximumSales: 2000000,
        commissionPercentage: 0.15,
        bonusAmount: 10000,
        isActive: true,
        effectiveDate: '2024-01-01'
      }
    ];

    // Sample deals
    const sampleDeals = [
      {
        id: 'D001',
        clientId: '001',
        salesRepId: 'SR001',
        backendId: 'B001',
        dealStatus: 'Enrolled',
        enrollmentDate: '2024-04-08',
        totalDebtEnrolled: 35000,
        programLength: 36,
        monthlyPayment: 850,
        setupFee: 500,
        serviceFee: 250,
        commissionAmount: 1750,
        commissionPaid: true,
        commissionPaymentDate: '2024-04-15',
        qaStatus: 'Approved',
        qaNotes: 'All documentation verified',
        qaReviewerId: 'U003'
      }
    ];

    // Sample sales metrics
    const sampleSalesMetrics = [
      {
        id: 'M001',
        salesRepId: 'SR001',
        teamId: 'T001',
        metricDate: '2024-04-09',
        callsMade: 25,
        callsAnswered: 15,
        appointmentsSet: 8,
        appointmentsKept: 6,
        presentations: 5,
        enrollments: 3,
        totalDebtEnrolled: 105000,
        conversionRate: 0.12,
        averageDebtPerClient: 35000
      }
    ];

    // Sample sales targets
    const sampleSalesTargets = [
      {
        id: 'ST001',
        salesRepId: 'SR001',
        teamId: 'T001',
        targetPeriod: '2024-04',
        targetType: 'Monthly',
        enrollmentTarget: 15,
        revenueTarget: 500000,
        debtEnrollmentTarget: 1500000,
        actualEnrollments: 8,
        actualRevenue: 280000,
        actualDebtEnrolled: 840000,
        achievementPercentage: 0.56
      }
    ];

    setSalesReps(sampleSalesReps);
    setTeams(sampleTeams);
    setCommissionTiers(sampleCommissionTiers);
    setDeals(sampleDeals);
    setSalesMetrics(sampleSalesMetrics);
    setSalesTargets(sampleSalesTargets);

    // This would normally be an API call to your backend
    const sampleClients = [
      {
        id: '001',
        name: 'John Smith',
        email: 'john.smith@example.com',
        phone: '(555) 123-4567',
        totalDebt: 35000,
        status: 'new',
        dateAdded: '2025-04-05',
        lastContact: '2025-04-07',
        creditScore: null,
        debtDetails: [
          { type: 'Credit Card', creditor: 'Chase', balance: 15000, minPayment: 450, interestRate: 22.99 },
          { type: 'Personal Loan', creditor: 'Wells Fargo', balance: 20000, minPayment: 650, interestRate: 15.50 }
        ],
        notes: [
          { date: '2025-04-07', text: 'Initial consultation scheduled for 04/10/2025', author: 'Sarah Jenkins' }
        ],
        income: 5200,
        expenses: 4300,
        assignedTo: 'Sarah Jenkins'
      },
      {
        id: '002',
        name: 'Maria Garcia',
        email: 'maria.garcia@example.com',
        phone: '(555) 987-6543',
        totalDebt: 42000,
        status: 'in_progress',
        dateAdded: '2025-03-28',
        lastContact: '2025-04-06',
        creditScore: 620,
        debtDetails: [
          { type: 'Credit Card', creditor: 'Bank of America', balance: 12000, minPayment: 360, interestRate: 24.99 },
          { type: 'Credit Card', creditor: 'Capital One', balance: 8000, minPayment: 240, interestRate: 19.99 },
          { type: 'Medical Debt', creditor: 'Memorial Hospital', balance: 22000, minPayment: 550, interestRate: 0 }
        ],
        notes: [
          { date: '2025-03-28', text: 'Client is interested in debt consolidation options', author: 'Michael Chen' },
          { date: '2025-04-06', text: 'Discussed Achieve program, client wants to think it over', author: 'Michael Chen' }
        ],
        income: 4800,
        expenses: 3900,
        assignedTo: 'Michael Chen',
        recommendedBackend: 'Achieve'
      },
      {
        id: '003',
        name: 'Robert Johnson',
        email: 'robert.johnson@example.com',
        phone: '(555) 333-2222',
        totalDebt: 68000,
        status: 'enrolled',
        dateAdded: '2025-03-15',
        lastContact: '2025-04-08',
        creditScore: 580,
        debtDetails: [
          { type: 'Credit Card', creditor: 'Discover', balance: 18000, minPayment: 540, interestRate: 21.99 },
          { type: 'Credit Card', creditor: 'Citi', balance: 15000, minPayment: 450, interestRate: 22.99 },
          { type: 'Personal Loan', creditor: 'LendingClub', balance: 25000, minPayment: 750, interestRate: 16.50 },
          { type: 'Auto Loan', creditor: 'Toyota Financial', balance: 10000, minPayment: 350, interestRate: 5.99 }
        ],
        notes: [
          { date: '2025-03-15', text: 'Client has multiple high-interest debts, struggling to make minimum payments', author: 'David Wilson' },
          { date: '2025-03-22', text: 'Recommended Cordoba program based on debt profile', author: 'David Wilson' },
          { date: '2025-04-08', text: 'Client enrolled in Cordoba program, paperwork complete', author: 'David Wilson' }
        ],
        income: 5500,
        expenses: 5100,
        assignedTo: 'David Wilson',
        enrolledBackend: 'Cordoba',
        enrollmentDate: '2025-04-08'
      }
    ];
    
    setClients(sampleClients);
  }, []);

  // Filter clients based on search and status filter
  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          client.phone.includes(searchQuery);
    
    const matchesFilter = filterStatus === 'all' || client.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  // Handle credit pull
  const handleCreditPull = (clientId) => {
    // In a real app, this would call an API to perform a soft credit pull
    setShowCreditPull(true);
    
    // Simulate API delay
    setTimeout(() => {
      setClients(prevClients => 
        prevClients.map(client => 
          client.id === clientId 
            ? { ...client, creditScore: Math.floor(Math.random() * (720 - 520) + 520) } 
            : client
        )
      );
      setShowCreditPull(false);
      
      // After credit pull, show decision engine
      setShowDecisionEngine(true);
      
      // Simulate decision engine processing
      setTimeout(() => {
        const client = clients.find(c => c.id === clientId);
        let decision = { 
          clientId,
          recommendedBackend: null,
          reasons: [],
          alternativeOptions: []
        };
        
        if (client) {
          // Simple decision logic (would be much more complex in real implementation)
          if (client.totalDebt > 50000 && (client.creditScore || 0) < 600) {
            decision.recommendedBackend = 'Cordoba';
            decision.reasons.push('High debt amount exceeding $50,000');
            decision.reasons.push('Credit score below 600');
            decision.alternativeOptions.push('Freedom Debt Relief');
          } else if (client.totalDebt > 30000 && (client.creditScore || 0) >= 600) {
            decision.recommendedBackend = 'Achieve';
            decision.reasons.push('Moderate to high debt amount');
            decision.reasons.push('Credit score 600 or above');
            decision.alternativeOptions.push('National Debt Relief');
          } else {
            decision.recommendedBackend = 'National Debt Relief';
            decision.reasons.push('Lower debt amount');
            decision.alternativeOptions.push('Achieve');
          }
        }
        
        setClientDecision(decision);
        setShowDecisionEngine(false);
        
        // Update client with recommendation
        if (client) {
          setClients(prevClients => 
            prevClients.map(c => 
              c.id === clientId 
                ? { ...c, recommendedBackend: decision.recommendedBackend } 
                : c
            )
          );
        }
      }, 2000);
    }, 3000);
  };

  // Add a new note to a client
  const addNote = (clientId, noteText) => {
    if (!noteText.trim()) return;
    
    const newNote = {
      date: new Date().toISOString().split('T')[0],
      text: noteText,
      author: 'Current User' // In a real app, this would be the logged-in user
    };
    
    setClients(prevClients => 
      prevClients.map(client => 
        client.id === clientId 
          ? { ...client, notes: [...client.notes, newNote], lastContact: newNote.date } 
          : client
      )
    );
  };

  // Enroll a client with a specific backend
  const enrollClient = (clientId, backend) => {
    setClients(prevClients => 
      prevClients.map(client => 
        client.id === clientId 
          ? { 
              ...client, 
              status: 'enrolled', 
              enrolledBackend: backend,
              enrollmentDate: new Date().toISOString().split('T')[0]
            } 
          : client
      )
    );
    
    // Close the client view and return to the list
    setCurrentClient(null);
  };

  // Render dashboard tab
  const renderDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-2">Client Overview</h3>
        <div className="flex justify-between mb-2">
          <span>Total Clients</span>
          <span className="font-semibold">{clients.length}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>New Clients (Last 7 Days)</span>
          <span className="font-semibold">
            {clients.filter(c => {
              const date = new Date(c.dateAdded);
              const today = new Date();
              const diffTime = Math.abs(today - date);
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              return diffDays <= 7;
            }).length}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Enrolled Clients</span>
          <span className="font-semibold">
            {clients.filter(c => c.status === 'enrolled').length}
          </span>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-2">Backend Distribution</h3>
        <div className="space-y-2">
          {backendOptions.map(backend => {
            const count = clients.filter(c => c.enrolledBackend === backend).length;
            const percentage = clients.length > 0 
              ? Math.round((count / clients.length) * 100) 
              : 0;
            
            return (
              <div key={backend}>
                <div className="flex justify-between text-sm">
                  <span>{backend}</span>
                  <span>{count} ({percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-2">Recent Activity</h3>
        <div className="space-y-3">
          {clients
            .flatMap(client => 
              client.notes.map(note => ({
                clientId: client.id,
                clientName: client.name,
                ...note
              }))
            )
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5)
            .map((activity, index) => (
              <div key={index} className="text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">{activity.clientName}</span>
                  <span className="text-gray-500">{activity.date}</span>
                </div>
                <p className="text-gray-700 truncate">{activity.text}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
  
  // Render integration settings tab
  const renderIntegrations = () => (
    <div>
      <h2 className="text-xl font-bold mb-6">Backend Integrations</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Active Integrations */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Active Integrations</h3>
          
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">Cordoba</div>
                  <div className="text-sm text-gray-500">Connected on Apr 01, 2025</div>
                </div>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Active</span>
              </div>
              <div className="mt-3 flex justify-between">
                <div className="text-sm">
                  <div className="text-gray-500">API Key: <span className="font-mono">********3f7a</span></div>
                  <div className="text-gray-500">Endpoint: api.cordoba.com/v2</div>
                </div>
                <button className="text-sm text-blue-600">Configure</button>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">Achieve</div>
                  <div className="text-sm text-gray-500">Connected on Mar 15, 2025</div>
                </div>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Active</span>
              </div>
              <div className="mt-3 flex justify-between">
                <div className="text-sm">
                  <div className="text-gray-500">Client ID: <span className="font-mono">achieve_2fd9</span></div>
                  <div className="text-gray-500">Environment: Production</div>
                </div>
                <button className="text-sm text-blue-600">Configure</button>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">Freedom Debt Relief</div>
                  <div className="text-sm text-gray-500">Connected on Mar 22, 2025</div>
                </div>
                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Limited</span>
              </div>
              <div className="mt-3 flex justify-between">
                <div className="text-sm">
                  <div className="text-gray-500">Partner ID: <span className="font-mono">FDR-P5729</span></div>
                  <div className="text-gray-500 text-yellow-600">OAuth token expired - needs renewal</div>
                </div>
                <button className="text-sm text-blue-600">Configure</button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Add New Integration */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Add New Integration</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Integration Type</label>
              <select className="w-full border rounded-lg px-3 py-2">
                <option>Debt Resolution Provider</option>
                <option>Lending Platform</option>
                <option>Credit Bureau</option>
                <option>Document Management</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Provider</label>
              <select className="w-full border rounded-lg px-3 py-2">
                <option>National Debt Relief</option>
                <option>DebtWave Credit Counseling</option>
                <option>ClearOne Advantage</option>
                <option>Custom Provider</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Authentication Method</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input type="radio" name="auth-method" className="mr-2" defaultChecked />
                  API Key
                </label>
                <label className="flex items-center">
                  <input type="radio" name="auth-method" className="mr-2" />
                  OAuth 2.0
                </label>
                <label className="flex items-center">
                  <input type="radio" name="auth-method" className="mr-2" />
                  Basic Auth
                </label>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
              <input type="text" className="w-full border rounded-lg px-3 py-2" placeholder="Enter API key" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">API Endpoint URL</label>
              <input type="text" className="w-full border rounded-lg px-3 py-2" placeholder="https://api.example.com/v1" />
            </div>
            
            <div className="pt-2">
              <button className="bg-blue-600 text-white rounded-lg px-4 py-2 w-full">
                Add Integration
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decision Engine Configuration */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-6">Decision Engine Configuration</h2>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Routing Rules</h3>
            <p className="text-gray-600 mb-4">
              Configure how clients are routed to different backends based on their financial profile.
            </p>
            
            <div className="border rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Condition</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Route To</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3">1</td>
                    <td className="px-4 py-3">
                      <div className="font-medium">High Debt Amount</div>
                      <div className="text-sm text-gray-500">Total Debt {'>'} $50,000 AND Credit Score {'<'} 600</div>
                    </td>
                    <td className="px-4 py-3">Cordoba</td>
                    <td className="px-4 py-3">
                      <button className="text-blue-600 text-sm mr-3">Edit</button>
                      <button className="text-red-600 text-sm">Delete</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">2</td>
                    <td className="px-4 py-3">
                      <div className="font-medium">Moderate Debt, Good Credit</div>
                      <div className="text-sm text-gray-500">Total Debt {'>'} $30,000 AND Credit Score {'>='} 600</div>
                    </td>
                    <td className="px-4 py-3">Achieve</td>
                    <td className="px-4 py-3">
                      <button className="text-blue-600 text-sm mr-3">Edit</button>
                      <button className="text-red-600 text-sm">Delete</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">3</td>
                    <td className="px-4 py-3">
                      <div className="font-medium">Default Rule</div>
                      <div className="text-sm text-gray-500">All other cases</div>
                    </td>
                    <td className="px-4 py-3">National Debt Relief</td>
                    <td className="px-4 py-3">
                      <button className="text-blue-600 text-sm mr-3">Edit</button>
                      <button className="text-red-600 text-sm">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <button className="mt-4 flex items-center gap-2 text-blue-600">
              <span>+ Add New Rule</span>
            </button>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Credit Pull Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Credit Bureau</label>
                  <select className="w-full border rounded-lg px-3 py-2">
                    <option>Transunion</option>
                    <option>Experian</option>
                    <option>Equifax</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pull Type</label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input type="radio" name="pull-type" className="mr-2" defaultChecked />
                      Soft Pull
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="pull-type" className="mr-2" />
                      Hard Pull
                    </label>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Soft pulls do not affect client's credit score
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Auto-Pull Credit</label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      For new clients
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Before recommendation
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Required Consent Language</label>
                  <textarea 
                    className="w-full border rounded-lg px-3 py-2 h-32"
                    defaultValue="I authorize [Company Name] to obtain my credit report from credit reporting agencies for the purpose of evaluating debt relief options. This will be a 'soft pull' that does not affect my credit score."
                  ></textarea>
                </div>
                
                <div>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    <span className="text-sm">Require electronic signature before credit pull</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render clients tab
  const renderClients = () => (
    <div>
      <div className="mb-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search clients..."
            className="pl-10 pr-4 py-2 border rounded-lg w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <select 
            className="border rounded-lg px-3 py-2"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="in_progress">In Progress</option>
            <option value="enrolled">Enrolled</option>
          </select>
          
          <button className="flex items-center gap-1 bg-white border rounded-lg px-3 py-2">
            <Filter size={18} />
            <span>More Filters</span>
          </button>
          
          <button 
            className="bg-blue-600 text-white rounded-lg px-4 py-2"
            onClick={() => setShowAddClientModal(true)}
          >
            + Add Client
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Debt</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qualification</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredClients.map((client) => (
              <tr key={client.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                      {client.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{client.name}</div>
                      <div className="text-sm text-gray-500">{client.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${client.totalDebt.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    client.status === 'new' ? 'bg-blue-100 text-blue-800' : 
                    client.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-green-100 text-green-800'
                  }`}>
                    {client.status === 'new' ? 'New' : 
                     client.status === 'in_progress' ? 'In Progress' : 
                     'Enrolled'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    client.qualificationStatus === 'qualified' ? 'bg-green-100 text-green-800' :
                    client.qualificationStatus === 'not_qualified' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {client.qualificationStatus}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {client.lastContact}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {client.assignedTo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    className="text-blue-600 hover:text-blue-900 mr-3"
                    onClick={() => setCurrentClient(client)}
                  >
                    View
                  </button>
                  <button 
                    className="text-blue-600 hover:text-blue-900 mr-3"
                    onClick={() => handleCreditPull(client.id)}
                  >
                    Credit Pull
                  </button>
                  <button 
                    className="text-blue-600 hover:text-blue-900"
                    onClick={() => setSelectedClient({...client, showQualification: true})}
                  >
                    Qualify
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Render client details view
  const renderClientDetails = () => {
    if (!currentClient) return null;

    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold">{currentClient.name}</h2>
            <div className="text-gray-500">{currentClient.email}</div>
          </div>
          <div className="flex gap-2">
            <button 
              className="bg-blue-600 text-white rounded-lg px-4 py-2"
              onClick={() => setShowAddDebtModal(true)}
            >
              Add Debt
            </button>
            <button 
              className="bg-purple-600 text-white rounded-lg px-4 py-2"
              onClick={() => handleRunDecisionEngine(currentClient.id)}
            >
              Run Decision Engine
            </button>
            <button 
              className="bg-green-600 text-white rounded-lg px-4 py-2"
              onClick={() => setSelectedClient({...currentClient, showQualification: true})}
            >
              Qualify Client
            </button>
            <button 
              className="bg-gray-600 text-white rounded-lg px-4 py-2"
              onClick={() => setCurrentClient(null)}
            >
              Back to List
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Client Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Client Information</h3>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-gray-500">Phone</div>
                <div>{currentClient.phone}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Total Debt</div>
                <div className="text-xl font-semibold">${currentClient.totalDebt.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Credit Score</div>
                <div>{currentClient.creditScore || 'Not pulled'}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Monthly Income</div>
                <div>${currentClient.income.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Monthly Expenses</div>
                <div>${currentClient.expenses.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Qualification Status</div>
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  currentClient.qualificationStatus === 'qualified' ? 'bg-green-100 text-green-800' :
                  currentClient.qualificationStatus === 'not_qualified' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {currentClient.qualificationStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Debt Details */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Debt Details</h3>
            <div className="space-y-4">
              {currentClient.debtDetails.map((debt, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">{debt.type}</div>
                      <div className="text-sm text-gray-500">{debt.creditor}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${debt.balance.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">{debt.interestRate}% APR</div>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    Min Payment: ${debt.minPayment}/month
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notes Section */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Notes</h3>
          <div className="space-y-4">
            {currentClient.notes.map((note, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-medium">{note.author}</div>
                  <div className="text-sm text-gray-500">{note.date}</div>
                </div>
                <div>{note.text}</div>
              </div>
            ))}
            <div className="border rounded-lg p-4">
              <textarea
                className="w-full border rounded-lg px-3 py-2 mb-2"
                placeholder="Add a new note..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
              />
              <button
                className="bg-blue-600 text-white rounded-lg px-4 py-2"
                onClick={() => {
                  addNote(currentClient.id, newNote);
                  setNewNote('');
                }}
              >
                Add Note
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // New function to calculate sales rep performance
  const calculateSalesRepPerformance = (salesRepId) => {
    const metrics = salesMetrics.find(m => m.salesRepId === salesRepId);
    const target = salesTargets.find(t => t.salesRepId === salesRepId);
    const rep = salesReps.find(r => r.id === salesRepId);
    
    if (!metrics || !target || !rep) return null;
    
    return {
      conversionRate: metrics.conversionRate,
      achievementPercentage: target.achievementPercentage,
      ytdSales: rep.ytdSales,
      ytdCommission: rep.ytdCommission
    };
  };

  // Render sales dashboard
  const renderSalesDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-2">Sales Performance</h3>
        <div className="space-y-4">
          {salesReps.map(rep => {
            const performance = calculateSalesRepPerformance(rep.id);
            if (!performance) return null;
            
            return (
              <div key={rep.id} className="border-b pb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{rep.name}</span>
                  <span className="text-sm text-gray-500">{rep.teamName}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">YTD Sales:</span>
                    <span className="ml-2 font-medium">${performance.ytdSales.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">YTD Commission:</span>
                    <span className="ml-2 font-medium">${performance.ytdCommission.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Conversion Rate:</span>
                    <span className="ml-2 font-medium">{(performance.conversionRate * 100).toFixed(1)}%</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Target Achievement:</span>
                    <span className="ml-2 font-medium">{(performance.achievementPercentage * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-2">Commission Tiers</h3>
        <div className="space-y-4">
          {commissionTiers.map(tier => (
            <div key={tier.id} className="border-b pb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{tier.tierName}</span>
                <span className="text-sm text-gray-500">{tier.commissionPercentage * 100}% Commission</span>
              </div>
              <div className="text-sm text-gray-500">
                Sales Range: ${tier.minimumSales.toLocaleString()} - ${tier.maximumSales.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">
                Bonus: ${tier.bonusAmount.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-2">Recent Deals</h3>
        <div className="space-y-4">
          {deals.map(deal => {
            const client = clients.find(c => c.id === deal.clientId);
            const rep = salesReps.find(r => r.id === deal.salesRepId);
            
            return (
              <div key={deal.id} className="border-b pb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{client?.name || 'Unknown Client'}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    deal.dealStatus === 'Enrolled' ? 'bg-green-100 text-green-800' :
                    deal.dealStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {deal.dealStatus}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  Rep: {rep?.name || 'Unknown Rep'}
                </div>
                <div className="text-sm text-gray-500">
                  Commission: ${deal.commissionAmount.toLocaleString()}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // New functions for admin functionality
  const handleAddRep = (newRep) => {
    setSalesReps([...salesReps, {
      id: `SR${String(salesReps.length + 1).padStart(3, '0')}`,
      ...newRep,
      employmentStatus: 'Active',
      ytdSales: 0,
      ytdCommission: 0
    }]);
    setShowAddRepModal(false);
  };

  const handleAddTeam = (newTeam) => {
    setTeams([...teams, {
      id: `T${String(teams.length + 1).padStart(3, '0')}`,
      ...newTeam,
      createdDate: new Date().toISOString().split('T')[0],
      isActive: true
    }]);
    setShowAddTeamModal(false);
  };

  const handleUpdatePermissions = (repId, newPermissions) => {
    setSalesReps(prevReps => 
      prevReps.map(rep => 
        rep.id === repId 
          ? { ...rep, permissions: newPermissions }
          : rep
      )
    );
  };

  // Render admin dashboard
  const renderAdminDashboard = () => (
    <div className="space-y-6">
      {/* Admin Header */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Admin Dashboard</h2>
          <div className="flex gap-2">
            <button
              className="bg-blue-600 text-white rounded-lg px-4 py-2 flex items-center gap-2"
              onClick={() => setShowAddRepModal(true)}
            >
              <UserPlus size={18} />
              Add Sales Rep
            </button>
            <button
              className="bg-green-600 text-white rounded-lg px-4 py-2 flex items-center gap-2"
              onClick={() => setShowAddTeamModal(true)}
            >
              <Users size={18} />
              Add Team
            </button>
          </div>
        </div>
      </div>

      {/* Sales Representatives Management */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <h3 className="text-lg font-medium">Sales Representatives</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Team</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Commission Tier</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">YTD Sales</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {salesReps.map(rep => (
                <tr key={rep.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                        {rep.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{rep.name}</div>
                        <div className="text-sm text-gray-500">{rep.payrollId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {teams.find(t => t.id === rep.teamId)?.teamName || 'Unassigned'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      rep.employmentStatus === 'Active' ? 'bg-green-100 text-green-800' :
                      rep.employmentStatus === 'OnLeave' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {rep.employmentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {commissionTiers.find(t => t.id === rep.commissionTier)?.tierName || 'Not Set'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${rep.ytdSales.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      className="text-blue-600 hover:text-blue-900 mr-3"
                      onClick={() => setSelectedRep(rep)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-blue-600 hover:text-blue-900"
                      onClick={() => setSelectedRep({...rep, showPermissions: true})}
                    >
                      Permissions
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Teams Management */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <h3 className="text-lg font-medium">Teams</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Team Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Manager</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Region</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Target</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teams.map(team => (
                <tr key={team.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{team.teamName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {salesReps.find(r => r.userId === team.managerId)?.name || 'Unassigned'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{team.region}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${team.teamTarget.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      team.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {team.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Sales Rep Modal */}
      {showAddRepModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Add Sales Representative</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" className="mt-1 block w-full border rounded-md shadow-sm p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Team</label>
                <select className="mt-1 block w-full border rounded-md shadow-sm p-2">
                  {teams.map(team => (
                    <option key={team.id} value={team.id}>{team.teamName}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Commission Tier</label>
                <select className="mt-1 block w-full border rounded-md shadow-sm p-2">
                  {commissionTiers.map(tier => (
                    <option key={tier.id} value={tier.id}>{tier.tierName}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Payroll ID</label>
                <input type="text" className="mt-1 block w-full border rounded-md shadow-sm p-2" />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="bg-gray-200 text-gray-700 rounded-lg px-4 py-2"
                  onClick={() => setShowAddRepModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white rounded-lg px-4 py-2"
                >
                  Add Rep
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Permissions Modal */}
      {selectedRep?.showPermissions && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Manage Permissions - {selectedRep.name}</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Manage Teams</span>
                <button className="text-blue-600">
                  <Lock size={18} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">View All Clients</span>
                <button className="text-blue-600">
                  <Lock size={18} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Manage Commissions</span>
                <button className="text-blue-600">
                  <Lock size={18} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">View Reports</span>
                <button className="text-blue-600">
                  <Lock size={18} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Manage Backends</span>
                <button className="text-blue-600">
                  <Lock size={18} />
                </button>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  className="bg-gray-200 text-gray-700 rounded-lg px-4 py-2"
                  onClick={() => setSelectedRep(null)}
                >
                  Close
                </button>
                <button
                  className="bg-blue-600 text-white rounded-lg px-4 py-2"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // New functions for client management
  const handleAddClient = (clientData) => {
    const newClientWithId = {
      ...clientData,
      id: `C${String(clients.length + 1).padStart(3, '0')}`,
      debtDetails: [],
      notes: []
    };
    setClients([...clients, newClientWithId]);
    setShowAddClientModal(false);
  };

  const handleUpdateClient = (clientId, updatedData) => {
    setClients(prevClients =>
      prevClients.map(client =>
        client.id === clientId ? { ...client, ...updatedData } : client
      )
    );
    setShowEditClientModal(false);
  };

  const handleAddDebt = (clientId, debtData) => {
    const newDebt = {
      id: `D${String(Math.random()).substr(2, 6)}`,
      ...debtData
    };
    setClients(prevClients =>
      prevClients.map(client =>
        client.id === clientId
          ? {
              ...client,
              debtDetails: [...client.debtDetails, newDebt],
              totalDebt: client.totalDebt + parseFloat(debtData.balance)
            }
          : client
      )
    );
    setShowAddDebtModal(false);
  };

  const handleQualifyClient = (clientId, qualificationData) => {
    setClients(prevClients =>
      prevClients.map(client =>
        client.id === clientId
          ? {
              ...client,
              qualificationStatus: qualificationData.status,
              qualificationNotes: qualificationData.notes,
              monthlyPayment: qualificationData.monthlyPayment,
              programLength: qualificationData.programLength,
              status: qualificationData.status === 'qualified' ? 'in_progress' : 'new'
            }
          : client
      )
    );
  };

  // Render client management modals
  const renderAddClientModal = () => (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
        <h3 className="text-lg font-medium mb-4">Add New Client</h3>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                className="mt-1 block w-full border rounded-md shadow-sm p-2"
                value={newClient.name}
                onChange={(e) => setNewClient({...newClient, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 block w-full border rounded-md shadow-sm p-2"
                value={newClient.email}
                onChange={(e) => setNewClient({...newClient, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                className="mt-1 block w-full border rounded-md shadow-sm p-2"
                value={newClient.phone}
                onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Assigned To</label>
              <select
                className="mt-1 block w-full border rounded-md shadow-sm p-2"
                value={newClient.assignedTo}
                onChange={(e) => setNewClient({...newClient, assignedTo: e.target.value})}
              >
                <option value="">Select Sales Rep</option>
                {salesReps.map(rep => (
                  <option key={rep.id} value={rep.id}>{rep.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="bg-gray-200 text-gray-700 rounded-lg px-4 py-2"
              onClick={() => setShowAddClientModal(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-lg px-4 py-2"
              onClick={() => handleAddClient(newClient)}
            >
              Add Client
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderAddDebtModal = () => (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-medium mb-4">Add Debt Account</h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Debt Type</label>
            <select className="mt-1 block w-full border rounded-md shadow-sm p-2">
              <option value="credit_card">Credit Card</option>
              <option value="personal_loan">Personal Loan</option>
              <option value="medical">Medical Debt</option>
              <option value="auto">Auto Loan</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Creditor Name</label>
            <input type="text" className="mt-1 block w-full border rounded-md shadow-sm p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Balance</label>
            <input type="number" className="mt-1 block w-full border rounded-md shadow-sm p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Minimum Payment</label>
            <input type="number" className="mt-1 block w-full border rounded-md shadow-sm p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Interest Rate (%)</label>
            <input type="number" step="0.01" className="mt-1 block w-full border rounded-md shadow-sm p-2" />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="bg-gray-200 text-gray-700 rounded-lg px-4 py-2"
              onClick={() => setShowAddDebtModal(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-lg px-4 py-2"
            >
              Add Debt
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderQualificationModal = () => (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-medium mb-4">Qualify Client</h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Qualification Status</label>
            <select className="mt-1 block w-full border rounded-md shadow-sm p-2">
              <option value="qualified">Qualified</option>
              <option value="not_qualified">Not Qualified</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Monthly Payment</label>
            <input type="number" className="mt-1 block w-full border rounded-md shadow-sm p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Program Length (months)</label>
            <input type="number" className="mt-1 block w-full border rounded-md shadow-sm p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Qualification Notes</label>
            <textarea className="mt-1 block w-full border rounded-md shadow-sm p-2" rows="4"></textarea>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="bg-gray-200 text-gray-700 rounded-lg px-4 py-2"
              onClick={() => setSelectedClient(null)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-lg px-4 py-2"
            >
              Save Qualification
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // New functions for decision engine
  const calculateDTI = (client) => {
    const monthlyDebtPayments = client.debtDetails.reduce((total, debt) => total + debt.minPayment, 0);
    return monthlyDebtPayments / client.income;
  };

  const runDecisionEngine = (client) => {
    const dti = calculateDTI(client);
    const creditScore = client.creditScore || 0;
    const totalDebt = client.totalDebt;

    // Find matching rule
    const matchingRule = routingRules
      .filter(rule => 
        totalDebt >= rule.conditions.minDebt &&
        creditScore <= rule.conditions.maxCreditScore &&
        dti >= rule.conditions.minDti
      )
      .sort((a, b) => a.priority - b.priority)[0];

    if (!matchingRule) {
      return {
        recommendedBackend: 'National Debt Relief',
        confidence: 'low',
        reasons: ['No specific rule match found. Defaulting to National Debt Relief.'],
        alternativeOptions: ['Achieve', 'Cordoba']
      };
    }

    return {
      recommendedBackend: matchingRule.backend,
      confidence: 'high',
      reasons: [
        `Debt amount ($${totalDebt.toLocaleString()}) matches criteria`,
        `Credit score (${creditScore}) within acceptable range`,
        `DTI ratio (${(dti * 100).toFixed(1)}%) meets requirements`
      ],
      alternativeOptions: routingRules
        .filter(r => r.backend !== matchingRule.backend)
        .map(r => r.backend)
    };
  };

  const handleRunDecisionEngine = (clientId) => {
    const client = clients.find(c => c.id === clientId);
    if (!client) return;

    const results = runDecisionEngine(client);
    setDecisionResults(results);
    setShowDecisionEngine(true);
  };

  const handleRouteToBackend = (clientId, backend) => {
    setClients(prevClients =>
      prevClients.map(client =>
        client.id === clientId
          ? {
              ...client,
              recommendedBackend: backend,
              status: 'in_progress',
              lastContact: new Date().toISOString().split('T')[0]
            }
          : client
      )
    );
    setShowRoutingModal(false);
  };

  // Render decision engine modal
  const renderDecisionEngineModal = () => (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-medium">Decision Engine Results</h3>
          <button
            className="text-gray-400 hover:text-gray-500"
            onClick={() => setShowDecisionEngine(false)}
          >
            <X size={20} />
          </button>
        </div>

        {decisionResults && (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="text-blue-600" size={20} />
                <h4 className="font-medium">Recommended Backend</h4>
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {decisionResults.recommendedBackend}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Confidence: {decisionResults.confidence}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Decision Factors</h4>
              <ul className="space-y-2">
                {decisionResults.reasons.map((reason, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="text-green-500 mt-1" size={16} />
                    <span className="text-sm">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Alternative Options</h4>
              <div className="grid grid-cols-2 gap-4">
                {decisionResults.alternativeOptions.map((backend, index) => (
                  <button
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                    onClick={() => {
                      setSelectedBackend(backend);
                      setShowRoutingModal(true);
                    }}
                  >
                    <span>{backend}</span>
                    <ArrowRight size={16} />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-200 text-gray-700 rounded-lg px-4 py-2"
                onClick={() => setShowDecisionEngine(false)}
              >
                Close
              </button>
              <button
                className="bg-blue-600 text-white rounded-lg px-4 py-2"
                onClick={() => {
                  setSelectedBackend(decisionResults.recommendedBackend);
                  setShowRoutingModal(true);
                }}
              >
                Route to Recommended Backend
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Render routing modal
  const renderRoutingModal = () => (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-medium mb-4">Route to {selectedBackend}</h3>
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            This will route the client to {selectedBackend} and update their status to "In Progress".
            The client will be notified of the next steps in their debt resolution journey.
          </p>
          <div className="flex justify-end gap-2">
            <button
              className="bg-gray-200 text-gray-700 rounded-lg px-4 py-2"
              onClick={() => setShowRoutingModal(false)}
            >
              Cancel
            </button>
            <button
              className="bg-blue-600 text-white rounded-lg px-4 py-2"
              onClick={() => handleRouteToBackend(currentClient.id, selectedBackend)}
            >
              Confirm Routing
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Main render
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-900">Debt Resolution CRM</h1>
              </div>
              <nav className="ml-6 flex space-x-8">
                <button
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === 'dashboard'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('dashboard')}
                >
                  <Home className="mr-2" size={18} />
                  Dashboard
                </button>
                <button
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === 'sales'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('sales')}
                >
                  <TrendingUp className="mr-2" size={18} />
                  Sales
                </button>
                <button
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === 'clients'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('clients')}
                >
                  <Users className="mr-2" size={18} />
                  Clients
                </button>
                <button
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === 'integrations'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('integrations')}
                >
                  <Settings className="mr-2" size={18} />
                  Integrations
                </button>
                {isAdmin && (
                  <button
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      activeTab === 'admin'
                        ? 'border-blue-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveTab('admin')}
                  >
                    <Shield className="mr-2" size={18} />
                    Admin
                  </button>
                )}
              </nav>
            </div>
            <div className="flex items-center">
              <button
                className="relative p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell size={20} />
                {notificationCount > 0 && (
                  <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-400 text-white text-xs flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </button>
              <div className="ml-3 relative">
                <button className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <User size={20} />
                  </div>
                  <ChevronDown className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'sales' && renderSalesDashboard()}
        {activeTab === 'clients' && (
          currentClient ? renderClientDetails() : renderClients()
        )}
        {activeTab === 'integrations' && renderIntegrations()}
        {activeTab === 'admin' && renderAdminDashboard()}
      </main>

      {/* Modals */}
      {showAddClientModal && renderAddClientModal()}
      {showAddDebtModal && renderAddDebtModal()}
      {selectedClient?.showQualification && renderQualificationModal()}
      {showDecisionEngine && renderDecisionEngineModal()}
      {showRoutingModal && renderRoutingModal()}
      {showCreditPull && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Pulling Credit Report</h3>
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-4 py-1">
                <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-2 bg-gray-200 rounded"></div>
                  <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 