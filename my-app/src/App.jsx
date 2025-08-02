import React, { useState, useEffect } from 'react';
import { User, Gift, TrendingUp, Award, Star, Zap, Heart, Target } from 'lucide-react';

// Mock backend data
const mockUsers = [
  { id: 1, name: 'Alex Johnson', email: 'alex@example.com', password: 'password123', donations: 2450 },
  { id: 2, name: 'Sarah Chen', email: 'sarah@example.com', password: 'password123', donations: 1890 },
  { id: 3, name: 'Mike Rodriguez', email: 'mike@example.com', password: 'password123', donations: 3120 }
];

const rewardsData = [
  { id: 1, name: 'Sticker Pack', requirement: 500, unlocked: true, icon: Star, color: 'from-yellow-400 to-orange-500' },
  { id: 2, name: 'T-shirt', requirement: 1000, unlocked: true, icon: Gift, color: 'from-blue-400 to-purple-500' },
  { id: 3, name: 'Water Bottle', requirement: 1500, unlocked: true, icon: Zap, color: 'from-green-400 to-teal-500' },
  { id: 4, name: 'Hoodie', requirement: 2000, unlocked: true, icon: Heart, color: 'from-pink-400 to-red-500' },
  { id: 5, name: 'Laptop Stickers', requirement: 2500, unlocked: false, icon: Target, color: 'from-indigo-400 to-cyan-500' },
  { id: 6, name: 'Certificate', requirement: 3000, unlocked: false, icon: Award, color: 'from-purple-400 to-pink-500' }
];

const InternDashboard = () => {
  const [currentView, setCurrentView] = useState('login');
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isLogin, setIsLogin] = useState(true);
  const [internData, setInternData] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentUser(user);
      setCurrentView("dashboard");
    }
  }, []);


  useEffect(() => {
    fetch("https://intern-dashboard-k9ex.onrender.com/intern")
      .then(res => res.json())
      .then(data => {
        console.log("Intern Data:", data);
        setInternData(data);
      })
      .catch(err => console.error("Failed to fetch intern:", err));
  }, []);


  // Simulate fetching user data from backend
  const fetchUserData = (userId) => {
    return fetch(`https://intern-dashboard-k9ex.onrender.com/api/user?email=${formData.email}&password=${formData.password}`)
      .then(res => {
        if (!res.ok) throw new Error("Invalid credentials");
        return res.json();
      })
      .then(user => {
        setCurrentUser(user);
        setCurrentView("dashboard");
      })
      .catch(() => alert("Invalid credentials"));


  };

  const handleAuth = (e) => {
    e.preventDefault();

    if (isLogin) {
      // Login logic
      const user = mockUsers.find(u => u.email === formData.email && u.password === formData.password);
      if (user) {
        setCurrentUser(user);
        setCurrentView('dashboard');
        // After successful login
        localStorage.setItem("currentUser", JSON.stringify(user));
        setCurrentUser(user); // or whatever state you're using

      } else {
        alert('Invalid credentials');
      }
    } else {
      // Signup logic
      const newUser = {
        id: mockUsers.length + 1,
        name: formData.name,
        email: formData.email,
        password: formData.password,
        donations: Math.floor(Math.random() * 3000) + 500
      };
      mockUsers.push(newUser);
      setCurrentUser(newUser);
      setCurrentView('dashboard');
    }
  };

  const generateReferralCode = (name) => {
    return `${name.toLowerCase().replace(/\s+/g, '')} 2025`;
  };

  const getUnlockedRewards = (donations) => {
    return rewardsData.map(reward => ({
      ...reward,
      unlocked: donations >= reward.requirement
    }));
  };

  if (currentView === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        </div>

        <div className="relative flex items-center justify-center min-h-screen p-4">
          <div className="w-full max-w-md">
            {/* Logo/Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Intern Dashboard</h1>

              <p className="text-slate-400">Track your impact and unlock rewards</p>
            </div>

            {/* Auth Form */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 shadow-2xl">
              <div className="flex mb-6">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-2 px-4 rounded-lg transition-all ${isLogin
                    ? 'bg-white/20 text-white font-semibold'
                    : 'text-slate-300 hover:text-white'
                    }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-2 px-4 rounded-lg transition-all ${!isLogin
                    ? 'bg-white/20 text-white font-semibold'
                    : 'text-slate-300 hover:text-white'
                    }`}
                >
                  Sign Up
                </button>
              </div>

              <form onSubmit={handleAuth} className="space-y-4">
                {!isLogin && (
                  <div>
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                )}

                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-purple-700 hover:to-cyan-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {isLogin ? 'Sign In' : 'Create Account'}
                </button>
              </form>

              {/* Demo credentials */}
              <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
                <p className="text-xs text-slate-400 mb-2">Demo credentials:</p>
                <p className="text-xs text-slate-300">Email: alex@example.com</p>
                <p className="text-xs text-slate-300">Password: password123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'dashboard' && currentUser) {
    const referralCode = generateReferralCode(currentUser.name);
    const rewards = getUnlockedRewards(currentUser.donations);
    const unlockedCount = rewards.filter(r => r.unlocked).length;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
        </div>

        <div className="relative">
          {/* Header */}
          <header className="bg-white/10 backdrop-blur-lg border-b border-white/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <h1 className="text-xl font-bold text-white">Intern Dashboard</h1>
                  {internData ? (
                    <div>
                      <p><strong>Name:</strong> {currentUser.name}</p>
                      <p><strong>Referral Code:</strong> {currentUser.referralCode}</p>
                      <p><strong>Donations:</strong> ₹{currentUser.donations}</p>
                    </div>
                  ) : (
                    <p>Loading intern data...</p>
                  )}
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5 text-slate-400" />
                    <span className="text-white font-medium">{currentUser.name}</span>
                  </div>
                  <button
                    onClick={() => {
                      setCurrentView('login');
                      setFormData({ name: '', email: '', password: '' });
                      localStorage.removeItem("currentUser");
                      setCurrentUser(null);

                    }}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Welcome Section */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                Welcome back, {currentUser.name}! 👋
              </h2>
              <p className="text-slate-400">Here's your impact overview and available rewards</p>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Donations Card */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-emerald-400 text-sm font-medium">+12% this month</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">${currentUser.donations.toLocaleString()}</h3>
                <p className="text-slate-400">Total Donations Raised</p>
              </div>

              {/* Referral Code Card */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Gift className="w-6 h-6 text-white" />
                  </div>
                  <button className="text-purple-400 text-sm font-medium hover:text-purple-300">Copy</button>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{referralCode}</h3>
                <p className="text-slate-400">Your Referral Code</p>
              </div>

              {/* Rewards Card */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-cyan-400 text-sm font-medium">{unlockedCount}/{rewards.length} unlocked</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{unlockedCount}</h3>
                <p className="text-slate-400">Rewards Unlocked</p>
              </div>
            </div>

            {/* Rewards Section */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Rewards & Unlockables</h3>
                <div className="text-slate-400 text-sm">
                  Progress: ${currentUser.donations} raised
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {rewards.map((reward) => {
                  const IconComponent = reward.icon;
                  return (
                    <div
                      key={reward.id}
                      className={`relative p-4 rounded-xl border transition-all ${reward.unlocked
                        ? 'bg-white/10 border-white/20 hover:bg-white/15'
                        : 'bg-white/5 border-white/10 opacity-60'
                        }`}
                    >
                      {reward.unlocked && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <Star className="w-3 h-3 text-white" />
                        </div>
                      )}

                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 bg-gradient-to-r ${reward.color}`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>

                      <h4 className="font-semibold text-white mb-1">{reward.name}</h4>
                      <p className="text-sm text-slate-400 mb-2">
                        Requires ${reward.requirement.toLocaleString()}
                      </p>

                      {
                        !reward.unlocked && (
                          <div className="w-full bg-white/10 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full transition-all"
                              style={{
                                width: ` ${Math.min((currentUser.donations / reward.requirement) * 100, 100)}%`
                              }}
                            ></div>
                          </div>
                        )
                      }

                      {
                        reward.unlocked && (
                          <div className="text-green-400 text-sm font-medium">
                            ✓ Unlocked!
                          </div>
                        )
                      }
                    </div>
                  );
                })}
              </div>
            </div>
          </main >
        </div >
      </div >
    );
  }

  return null;
};

export default InternDashboard;