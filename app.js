// Application Data
const appData = {
  kpi: {
    total_analyzed: 1250,
    fraudulent_detected: 287,
    avg_authenticity: 72.5,
    high_risk_count: 89
  },
  alerts: [
    { id: 1, username: 'fake_influencer_42', issue: 'Sudden 50K follower spike', severity: 'CRITICAL', timestamp: '2025-11-12T15:30:00' },
    { id: 2, username: 'bot_network_101', issue: 'Engagement rate anomaly detected', severity: 'HIGH', timestamp: '2025-11-12T14:15:00' },
    { id: 3, username: 'suspicious_account_7', issue: 'Geographic inconsistency in followers', severity: 'MEDIUM', timestamp: '2025-11-12T13:45:00' }
  ],
  fraudCategories: [
    { category: 'Fake Followers', count: 120 },
    { category: 'Engagement Manipulation', count: 95 },
    { category: 'Bot Activity', count: 50 },
    { category: 'Account Takeover', count: 22 }
  ],
  topSuspicious: [
    { id: 1, username: 'luxury_lifestyle_fake', followers: 450000, authenticity_score: 18, risk_level: 'CRITICAL' },
    { id: 2, username: 'crypto_pump_bot', followers: 280000, authenticity_score: 25, risk_level: 'CRITICAL' },
    { id: 3, username: 'engagement_bot_5', followers: 150000, authenticity_score: 35, risk_level: 'HIGH' },
    { id: 4, username: 'comment_spam_net', followers: 98000, authenticity_score: 42, risk_level: 'HIGH' },
    { id: 5, username: 'follower_seller_1', followers: 76000, authenticity_score: 48, risk_level: 'MEDIUM' }
  ],
  sampleInfluencer: {
    username: 'travel_adventure_2023',
    handle: '@travel_adv',
    followers: 850000,
    following: 2300,
    account_age_days: 1240,
    engagement_rate: 8.5,
    authenticity_score: 82,
    risk_level: 'LOW',
    fraud_indicators: [
      { name: 'Sudden Follower Spike', detected: false },
      { name: 'Unusual Comment Patterns', detected: false },
      { name: 'Identical Comments', detected: true },
      { name: 'Geographic Inconsistencies', detected: false },
      { name: 'Timing Anomalies', detected: false }
    ]
  },
  engagementTimeline: [
    { date: '2025-10-13', engagement: 7.2 },
    { date: '2025-10-20', engagement: 7.8 },
    { date: '2025-10-27', engagement: 8.1 },
    { date: '2025-11-03', engagement: 8.3 },
    { date: '2025-11-10', engagement: 8.5 },
    { date: '2025-11-12', engagement: 8.5 }
  ],
  followerGrowth: [
    { date: '2025-08-12', followers: 650000 },
    { date: '2025-09-12', followers: 720000 },
    { date: '2025-10-12', followers: 805000 },
    { date: '2025-11-12', followers: 850000 }
  ],
  followerDistribution: [
    { type: 'Real Followers', percentage: 78 },
    { type: 'Fake/Bot Followers', percentage: 15 },
    { type: 'Inactive Accounts', percentage: 7 }
  ],
  networkGraph: {
    nodes: [
      { id: 'influencer_1', label: 'Tech Guru', followers: 500000, authenticity_score: 85 },
      { id: 'influencer_2', label: 'Lifestyle Queen', followers: 450000, authenticity_score: 22 },
      { id: 'influencer_3', label: 'Fitness Coach', followers: 320000, authenticity_score: 75 },
      { id: 'influencer_4', label: 'Travel Vlogger', followers: 280000, authenticity_score: 88 },
      { id: 'influencer_5', label: 'Crypto Promoter', followers: 250000, authenticity_score: 15 }
    ],
    edges: [
      { source: 'influencer_1', target: 'influencer_3', weight: 0.8 },
      { source: 'influencer_1', target: 'influencer_4', weight: 0.6 },
      { source: 'influencer_2', target: 'influencer_5', weight: 0.9 },
      { source: 'influencer_3', target: 'influencer_4', weight: 0.7 }
    ]
  },
  batchReport: {
    total_profiles: 150,
    analyzed: 150,
    fraud_detected: 42,
    fraud_percentage: 28,
    detection_by_type: [
      { type: 'Fake Followers', count: 20 },
      { type: 'Engagement Bot', count: 15 },
      { type: 'Comment Spam', count: 7 }
    ]
  }
};

// Chart instances
let charts = {};

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initDashboard();
  initAnalysis();
  initNetwork();
  initReports();
  initSettings();
});

// Navigation
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const views = document.querySelectorAll('.view');
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const viewName = link.dataset.view;
      
      // Update active nav link
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      
      // Show corresponding view
      views.forEach(v => v.classList.remove('active'));
      document.getElementById(`${viewName}-view`).classList.add('active');
      
      // Close sidebar on mobile
      if (window.innerWidth <= 768) {
        sidebar.classList.remove('active');
      }
    });
  });

  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });
}

// Dashboard
function initDashboard() {
  // Populate KPI cards
  document.getElementById('kpi-total').textContent = appData.kpi.total_analyzed.toLocaleString();
  document.getElementById('kpi-fraud').textContent = appData.kpi.fraudulent_detected.toLocaleString();
  document.getElementById('kpi-avg').textContent = `${appData.kpi.avg_authenticity}%`;
  document.getElementById('kpi-risk').textContent = appData.kpi.high_risk_count.toLocaleString();

  // Populate alerts
  const alertsList = document.getElementById('alertsList');
  appData.alerts.forEach(alert => {
    const alertItem = document.createElement('div');
    alertItem.className = `alert-item ${alert.severity.toLowerCase()}`;
    alertItem.innerHTML = `
      <div class="alert-header">
        <span class="alert-username">@${alert.username}</span>
        <span class="alert-time">${formatTime(alert.timestamp)}</span>
      </div>
      <div class="alert-issue">${alert.issue}</div>
    `;
    alertsList.appendChild(alertItem);
  });

  // Fraud category chart
  const ctx = document.getElementById('fraudCategoryChart').getContext('2d');
  charts.fraudCategory = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: appData.fraudCategories.map(c => c.category),
      datasets: [{
        label: 'Cases Detected',
        data: appData.fraudCategories.map(c => c.count),
        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });

  // Populate suspicious accounts table
  const suspiciousTable = document.getElementById('suspiciousTable');
  appData.topSuspicious.forEach(account => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>@${account.username}</td>
      <td>${formatNumber(account.followers)}</td>
      <td>${account.authenticity_score}%</td>
      <td><span class="badge badge-${account.risk_level.toLowerCase()}">${account.risk_level}</span></td>
      <td><button class="btn btn--secondary" style="padding: 6px 12px; font-size: 12px;">View Details</button></td>
    `;
    suspiciousTable.appendChild(row);
  });
}

// Analysis View
function initAnalysis() {
  const analyzeBtn = document.getElementById('analyzeBtn');
  const searchInput = document.getElementById('searchInput');
  const profileResults = document.getElementById('profileResults');

  analyzeBtn.addEventListener('click', () => {
    const username = searchInput.value.trim();
    if (username) {
      analyzeProfile(username);
      profileResults.classList.add('active');
    }
  });

  // Initialize tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabName = btn.dataset.tab;
      
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      tabContents.forEach(c => c.classList.remove('active'));
      document.getElementById(`${tabName}-tab`).classList.add('active');
    });
  });

  // Initial analysis
  analyzeProfile('travel_adventure_2023');
  profileResults.classList.add('active');
}

function analyzeProfile(username) {
  const profile = appData.sampleInfluencer;
  
  // Update profile info
  document.getElementById('profileUsername').textContent = profile.username;
  document.getElementById('profileHandle').textContent = profile.handle;
  document.getElementById('profileFollowers').textContent = formatNumber(profile.followers);
  document.getElementById('profileFollowing').textContent = formatNumber(profile.following);
  document.getElementById('profileAge').textContent = `${(profile.account_age_days / 365).toFixed(1)} years`;
  document.getElementById('profileEngagement').textContent = `${profile.engagement_rate}%`;
  
  // Update authenticity score
  const scoreCircle = document.getElementById('scoreCircle');
  const scoreValue = document.getElementById('scoreValue');
  const riskBadge = document.getElementById('riskBadge');
  
  scoreValue.textContent = profile.authenticity_score;
  riskBadge.textContent = `${profile.risk_level} RISK`;
  
  scoreCircle.classList.remove('high', 'medium', 'low');
  riskBadge.classList.remove('badge-low', 'badge-medium', 'badge-high', 'badge-critical');
  
  if (profile.authenticity_score > 80) {
    scoreCircle.classList.add('high');
    riskBadge.classList.add('badge-low');
  } else if (profile.authenticity_score > 50) {
    scoreCircle.classList.add('medium');
    riskBadge.classList.add('badge-medium');
  } else {
    scoreCircle.classList.add('low');
    riskBadge.classList.add('badge-critical');
  }

  // Engagement chart
  if (charts.engagement) charts.engagement.destroy();
  const engagementCtx = document.getElementById('engagementChart').getContext('2d');
  charts.engagement = new Chart(engagementCtx, {
    type: 'line',
    data: {
      labels: appData.engagementTimeline.map(e => e.date),
      datasets: [{
        label: 'Engagement Rate (%)',
        data: appData.engagementTimeline.map(e => e.engagement),
        borderColor: '#1FB8CD',
        backgroundColor: 'rgba(31, 184, 205, 0.1)',
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: { beginAtZero: false }
      }
    }
  });

  // Follower pie chart
  if (charts.followerPie) charts.followerPie.destroy();
  const followerPieCtx = document.getElementById('followerPieChart').getContext('2d');
  charts.followerPie = new Chart(followerPieCtx, {
    type: 'pie',
    data: {
      labels: appData.followerDistribution.map(f => f.type),
      datasets: [{
        data: appData.followerDistribution.map(f => f.percentage),
        backgroundColor: ['#10B981', '#EF4444', '#F59E0B']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });

  // Growth chart
  if (charts.growth) charts.growth.destroy();
  const growthCtx = document.getElementById('growthChart').getContext('2d');
  charts.growth = new Chart(growthCtx, {
    type: 'line',
    data: {
      labels: appData.followerGrowth.map(g => g.date),
      datasets: [{
        label: 'Followers',
        data: appData.followerGrowth.map(g => g.followers),
        borderColor: '#1FB8CD',
        backgroundColor: 'rgba(31, 184, 205, 0.1)',
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: { 
          beginAtZero: false,
          ticks: {
            callback: function(value) {
              return formatNumber(value);
            }
          }
        }
      }
    }
  });

  // Fraud indicators
  const fraudIndicators = document.getElementById('fraudIndicators');
  fraudIndicators.innerHTML = '';
  profile.fraud_indicators.forEach(indicator => {
    const div = document.createElement('div');
    div.className = `fraud-indicator ${indicator.detected ? 'detected' : 'clean'}`;
    div.innerHTML = `
      <span class="indicator-icon">${indicator.detected ? '⚠️' : '✓'}</span>
      <span class="indicator-name">${indicator.name}</span>
      <span class="indicator-status ${indicator.detected ? 'detected' : 'clean'}">
        ${indicator.detected ? 'DETECTED' : 'CLEAN'}
      </span>
    `;
    fraudIndicators.appendChild(div);
  });
}

// Network Visualization
function initNetwork() {
  const canvas = document.getElementById('networkCanvas');
  const ctx = canvas.getContext('2d');
  const scoreFilter = document.getElementById('scoreFilter');
  const followerFilter = document.getElementById('followerFilter');
  const suspiciousOnly = document.getElementById('suspiciousOnly');
  const applyFilters = document.getElementById('applyFilters');
  
  // Set canvas size
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  let networkData = JSON.parse(JSON.stringify(appData.networkGraph));
  
  // Add positions to nodes
  networkData.nodes.forEach((node, i) => {
    const angle = (i / networkData.nodes.length) * Math.PI * 2;
    const radius = 200;
    node.x = canvas.width / 2 + Math.cos(angle) * radius;
    node.y = canvas.height / 2 + Math.sin(angle) * radius;
  });

  function drawNetwork() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw edges
    ctx.strokeStyle = 'rgba(119, 124, 124, 0.3)';
    ctx.lineWidth = 1;
    networkData.edges.forEach(edge => {
      const source = networkData.nodes.find(n => n.id === edge.source);
      const target = networkData.nodes.find(n => n.id === edge.target);
      if (source && target) {
        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.lineTo(target.x, target.y);
        ctx.stroke();
      }
    });
    
    // Draw nodes
    networkData.nodes.forEach(node => {
      const color = node.authenticity_score > 80 ? '#10B981' : 
                    node.authenticity_score > 50 ? '#F59E0B' : '#EF4444';
      
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(node.x, node.y, 20, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#fff';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(node.label.substring(0, 8), node.x, node.y + 35);
    });
  }

  drawNetwork();

  // Update filter values
  scoreFilter.addEventListener('input', (e) => {
    document.getElementById('scoreFilterValue').textContent = `${e.target.value} - 100`;
  });

  followerFilter.addEventListener('input', (e) => {
    document.getElementById('followerFilterValue').textContent = `${e.target.value} - 500K`;
  });

  applyFilters.addEventListener('click', () => {
    const minScore = parseInt(scoreFilter.value);
    const minFollowers = parseInt(followerFilter.value) * 1000;
    const onlySuspicious = suspiciousOnly.checked;

    networkData.nodes = appData.networkGraph.nodes.filter(node => {
      if (node.authenticity_score < minScore) return false;
      if (node.followers < minFollowers) return false;
      if (onlySuspicious && node.authenticity_score > 50) return false;
      return true;
    });

    drawNetwork();
    showToast('Filters applied successfully');
  });

  // Mouse interaction
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const hoveredNode = networkData.nodes.find(node => {
      const dist = Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2);
      return dist < 20;
    });
    
    canvas.style.cursor = hoveredNode ? 'pointer' : 'default';
  });
}

// Reports View
function initReports() {
  const uploadArea = document.getElementById('uploadArea');
  const fileInput = document.getElementById('fileInput');
  const browseBtn = document.getElementById('browseBtn');
  const uploadStatus = document.getElementById('uploadStatus');
  const reportSummary = document.getElementById('reportSummary');
  const exportBtn = document.getElementById('exportBtn');

  browseBtn.addEventListener('click', () => {
    fileInput.click();
  });

  uploadArea.addEventListener('click', () => {
    fileInput.click();
  });

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadStatus.innerHTML = '<p style="color: var(--color-primary);">Processing file...</p>';
      
      setTimeout(() => {
        uploadStatus.innerHTML = '<p style="color: var(--color-success);">✓ Analysis complete!</p>';
        reportSummary.classList.add('active');
        generateReport();
      }, 2000);
    }
  });

  exportBtn.addEventListener('click', () => {
    showToast('Report exported successfully!');
  });
}

function generateReport() {
  const report = appData.batchReport;
  
  document.getElementById('reportTotal').textContent = report.total_profiles;
  document.getElementById('reportFraud').textContent = report.fraud_detected;
  document.getElementById('reportPercent').textContent = `${report.fraud_percentage}%`;

  // Detection by type chart
  if (charts.reportType) charts.reportType.destroy();
  const reportTypeCtx = document.getElementById('reportTypeChart').getContext('2d');
  charts.reportType = new Chart(reportTypeCtx, {
    type: 'doughnut',
    data: {
      labels: report.detection_by_type.map(t => t.type),
      datasets: [{
        data: report.detection_by_type.map(t => t.count),
        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });

  // Heatmap (scatter plot simulation)
  if (charts.heatmap) charts.heatmap.destroy();
  const heatmapCtx = document.getElementById('heatmapChart').getContext('2d');
  
  // Generate sample heatmap data
  const heatmapData = [];
  for (let i = 0; i < 50; i++) {
    heatmapData.push({
      x: Math.random() * 500000,
      y: Math.random() * 15,
      r: Math.random() * 10 + 5
    });
  }
  
  charts.heatmap = new Chart(heatmapCtx, {
    type: 'bubble',
    data: {
      datasets: [{
        label: 'Fraud Risk',
        data: heatmapData,
        backgroundColor: 'rgba(239, 68, 68, 0.5)'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          title: { display: true, text: 'Follower Count' },
          ticks: {
            callback: function(value) {
              return formatNumber(value);
            }
          }
        },
        y: {
          title: { display: true, text: 'Engagement Rate (%)' }
        }
      }
    }
  });

  // Populate report table
  const reportTable = document.getElementById('reportTable');
  reportTable.innerHTML = '';
  
  const sampleReports = [
    { username: 'fake_acc_1', followers: 450000, engagement: 2.1, score: 18, risk: 'CRITICAL', type: 'Fake Followers', action: 'Flag & Review' },
    { username: 'bot_profile_2', followers: 280000, engagement: 1.8, score: 25, risk: 'CRITICAL', type: 'Bot Activity', action: 'Suspend' },
    { username: 'spam_user_3', followers: 150000, engagement: 3.2, score: 35, risk: 'HIGH', type: 'Engagement Bot', action: 'Monitor' },
    { username: 'real_influencer_4', followers: 320000, engagement: 7.5, score: 85, risk: 'LOW', type: 'None', action: 'Approved' },
    { username: 'medium_risk_5', followers: 98000, engagement: 4.5, score: 62, risk: 'MEDIUM', type: 'Comment Spam', action: 'Review' }
  ];
  
  sampleReports.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>@${item.username}</td>
      <td>${formatNumber(item.followers)}</td>
      <td>${item.engagement}%</td>
      <td>${item.score}%</td>
      <td><span class="badge badge-${item.risk.toLowerCase()}">${item.risk}</span></td>
      <td>${item.type}</td>
      <td>${item.action}</td>
    `;
    reportTable.appendChild(row);
  });
}

// Settings View
function initSettings() {
  const weightSliders = [
    { id: 'weightGrowth', valueId: 'weightGrowthValue' },
    { id: 'weightEngagement', valueId: 'weightEngagementValue' },
    { id: 'weightAge', valueId: 'weightAgeValue' },
    { id: 'weightNetwork', valueId: 'weightNetworkValue' }
  ];

  weightSliders.forEach(slider => {
    const input = document.getElementById(slider.id);
    const valueDisplay = document.getElementById(slider.valueId);
    
    input.addEventListener('input', (e) => {
      valueDisplay.textContent = `${e.target.value}%`;
    });
  });

  document.getElementById('saveSettings').addEventListener('click', () => {
    showToast('Settings saved successfully!');
  });

  document.getElementById('resetSettings').addEventListener('click', () => {
    document.getElementById('weightGrowth').value = 25;
    document.getElementById('weightEngagement').value = 35;
    document.getElementById('weightAge').value = 20;
    document.getElementById('weightNetwork').value = 20;
    document.getElementById('thresholdHigh').value = 50;
    document.getElementById('thresholdMedium').value = 80;
    document.getElementById('thresholdSpike').value = 25;
    
    document.getElementById('weightGrowthValue').textContent = '25%';
    document.getElementById('weightEngagementValue').textContent = '35%';
    document.getElementById('weightAgeValue').textContent = '20%';
    document.getElementById('weightNetworkValue').textContent = '20%';
    
    showToast('Settings reset to defaults');
  });
}

// Utility Functions
function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

function formatTime(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now - date;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  
  if (minutes < 60) {
    return `${minutes}m ago`;
  } else if (hours < 24) {
    return `${hours}h ago`;
  } else {
    return date.toLocaleDateString();
  }
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}