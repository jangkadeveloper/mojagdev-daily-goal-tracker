/**
 * Daily Goal Tracker - JavaScript Logic
 * Pure Vanilla JavaScript (No Libraries)
 */

// ==========================================
// DATA STRUCTURE & STATE
// ==========================================

const STORAGE_KEY = 'dailyGoalTracker';
const MAX_GOALS = 5;

let appData = {
    goals: [],
    currentStreak: 0,
    bestStreak: 0,
    lastActiveDate: null,
    history: {},
    stats: {
        totalDays: 0,
        totalGoalsCompleted: 0
    }
};

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    loadData();
    checkDailyReset();
    initializeEventListeners();
    renderAll();
    updateDateTime();
});

// ==========================================
// LOCAL STORAGE MANAGEMENT
// ==========================================

function loadData() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            appData = JSON.parse(stored);
        } catch (e) {
            console.error('Error loading data:', e);
            saveData(); // Initialize with default
        }
    } else {
        saveData(); // Initialize with default
    }
}

function saveData() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
    } catch (e) {
        console.error('Error saving data:', e);
        showToast('Gagal menyimpan data', 'error');
    }
}

// ==========================================
// DATE UTILITIES
// ==========================================

function getTodayDate() {
    const now = new Date();
    return formatDateKey(now);
}

function formatDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function formatDateDisplay(date) {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
                    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${dayName}, ${day} ${month} ${year}`;
}

function updateDateTime() {
    const currentDate = document.getElementById('currentDate');
    currentDate.textContent = formatDateDisplay(new Date());
}

// ==========================================
// DAILY RESET LOGIC
// ==========================================

function checkDailyReset() {
    const today = getTodayDate();
    const lastActive = appData.lastActiveDate;

    if (!lastActive || lastActive !== today) {
        // New day detected
        if (lastActive) {
            handleDayChange(lastActive, today);
        }
        appData.lastActiveDate = today;
        saveData();
    }
}

function handleDayChange(lastDate, currentDate) {
    // Save yesterday's data to history
    if (appData.goals.length > 0) {
        const completed = appData.goals.filter(g => g.completed).length;
        const total = appData.goals.length;

        appData.history[lastDate] = {
            total: total,
            completed: completed
        };

        // Update streak
        if (completed === total && total > 0) {
            // All goals completed yesterday
            appData.currentStreak++;
            if (appData.currentStreak > appData.bestStreak) {
                appData.bestStreak = appData.currentStreak;
            }
        } else {
            // Streak broken
            appData.currentStreak = 0;
        }

        // Update stats
        appData.stats.totalDays++;
        appData.stats.totalGoalsCompleted += completed;
    } else if (isConsecutiveDay(lastDate, currentDate)) {
        // No goals yesterday, but consecutive day - reset streak
        appData.currentStreak = 0;
    }

    // Reset today's goals (uncomplete all)
    appData.goals.forEach(goal => {
        goal.completed = false;
    });

    saveData();
}

function isConsecutiveDay(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffTime = Math.abs(d2 - d1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 1;
}

// ==========================================
// EVENT LISTENERS
// ==========================================

function initializeEventListeners() {
    const addGoalForm = document.getElementById('addGoalForm');
    const goalInput = document.getElementById('goalInput');

    addGoalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleAddGoal();
    });

    goalInput.addEventListener('input', () => {
        updateAddButton();
    });
}

function updateAddButton() {
    const goalInput = document.getElementById('goalInput');
    const addGoalBtn = document.getElementById('addGoalBtn');
    const isEmpty = goalInput.value.trim() === '';
    const isAtLimit = appData.goals.length >= MAX_GOALS;

    addGoalBtn.disabled = isEmpty || isAtLimit;
}

// ==========================================
// GOAL CRUD OPERATIONS
// ==========================================

function handleAddGoal() {
    const goalInput = document.getElementById('goalInput');
    const text = goalInput.value.trim();

    if (!text) {
        showToast('Goal tidak boleh kosong', 'error');
        return;
    }

    if (appData.goals.length >= MAX_GOALS) {
        showToast(`Maksimal ${MAX_GOALS} goals per hari`, 'error');
        return;
    }

    const newGoal = {
        id: Date.now(),
        text: text,
        completed: false
    };

    appData.goals.push(newGoal);
    saveData();

    goalInput.value = '';
    updateAddButton();
    renderAll();

    showToast('Goal berhasil ditambahkan!', 'success');
}

function handleToggleGoal(goalId) {
    const goal = appData.goals.find(g => g.id === goalId);
    if (goal) {
        goal.completed = !goal.completed;
        saveData();
        renderAll();

        if (goal.completed) {
            showToast('Goal selesai! 🎉', 'success');
            checkAllGoalsCompleted();
        }
    }
}

function handleDeleteGoal(goalId) {
    if (confirm('Yakin ingin menghapus goal ini?')) {
        appData.goals = appData.goals.filter(g => g.id !== goalId);
        saveData();
        renderAll();
        showToast('Goal berhasil dihapus', 'success');
    }
}

function checkAllGoalsCompleted() {
    if (appData.goals.length === 0) return;

    const allCompleted = appData.goals.every(g => g.completed);
    if (allCompleted) {
        setTimeout(() => {
            showToast('Semua goal hari ini selesai! Mantap! 🔥', 'success');
        }, 500);
    }
}

// ==========================================
// RENDER FUNCTIONS
// ==========================================

function renderAll() {
    renderGoalsList();
    renderProgress();
    renderStreak();
    renderStats();
    renderCalendar();
    updateAddButton();
}

function renderGoalsList() {
    const goalsList = document.getElementById('goalsList');
    const goalCountSpan = document.getElementById('goalCount');
    const goalLimitInfo = document.getElementById('goalLimitInfo');

    // Update count
    goalCountSpan.textContent = appData.goals.length;
    if (appData.goals.length >= MAX_GOALS) {
        goalLimitInfo.classList.add('at-limit');
    } else {
        goalLimitInfo.classList.remove('at-limit');
    }

    // Clear existing goal items (tapi jangan hapus emptyState)
    const existingGoalItems = goalsList.querySelectorAll('.goal-item');
    existingGoalItems.forEach(item => item.remove());

    // Get or create empty state
    let emptyState = document.getElementById('emptyState');
    if (!emptyState) {
        emptyState = document.createElement('div');
        emptyState.id = 'emptyState';
        emptyState.className = 'empty-state';
        emptyState.innerHTML = `
            <div class="empty-icon">🎯</div>
            <p>Belum ada goal hari ini</p>
            <p class="empty-subtitle">Tambahkan goal pertamamu untuk memulai!</p>
        `;
        goalsList.appendChild(emptyState);
    }

    // Show/hide empty state
    if (appData.goals.length === 0) {
        emptyState.style.display = 'flex';
    } else {
        emptyState.style.display = 'none';

        // Render goals
        appData.goals.forEach(goal => {
            const goalItem = document.createElement('div');
            goalItem.className = `goal-item ${goal.completed ? 'completed' : ''}`;

            goalItem.innerHTML = `
                <div class="goal-checkbox ${goal.completed ? 'checked' : ''}"
                     onclick="handleToggleGoal(${goal.id})">
                </div>
                <div class="goal-text">${escapeHtml(goal.text)}</div>
                <button class="btn-delete" onclick="handleDeleteGoal(${goal.id})">
                    Hapus
                </button>
            `;

            goalsList.appendChild(goalItem);
        });
    }
}

function renderProgress() {
    const total = appData.goals.length;
    const completed = appData.goals.filter(g => g.completed).length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    // Update progress count
    document.getElementById('progressCount').textContent = `${completed}/${total}`;

    // Update progress bar
    const progressFill = document.getElementById('progressFill');
    progressFill.style.width = `${percentage}%`;

    // Update percentage
    document.getElementById('progressPercentage').textContent = `${percentage}%`;

    // Update completion status
    const completionStatus = document.getElementById('completionStatus');
    const statusText = completionStatus.querySelector('.status-text');

    completionStatus.className = 'completion-status';

    if (total === 0) {
        statusText.textContent = 'Belum ada goal';
    } else if (completed === total) {
        completionStatus.classList.add('all-done');
        statusText.textContent = 'Semua goal selesai! 🎉';
    } else if (completed > 0) {
        completionStatus.classList.add('in-progress');
        statusText.textContent = `Ayo selesaikan ${total - completed} goal lagi!`;
    } else {
        statusText.textContent = 'Ayo mulai kerjakan goal!';
    }
}

function renderStreak() {
    const currentStreakEl = document.getElementById('currentStreak');
    const bestStreakEl = document.getElementById('bestStreak');
    const streakMessageEl = document.getElementById('streakMessage');

    currentStreakEl.textContent = appData.currentStreak;
    bestStreakEl.textContent = appData.bestStreak;

    // Update message based on streak
    let message = '';
    const streak = appData.currentStreak;

    if (streak === 0) {
        message = 'Ayo mulai streak! 💪';
    } else if (streak <= 2) {
        message = 'Bagus! Pertahankan momentum! 🔥';
    } else if (streak <= 6) {
        message = 'Bagus! Terus konsisten! ⭐';
    } else if (streak <= 13) {
        message = 'Luar biasa! 1 minggu streak! 🚀';
    } else if (streak <= 29) {
        message = 'Amazing! Kamu super konsisten! 💎';
    } else {
        message = 'Legendary! Kamu unstoppable! 👑';
    }

    streakMessageEl.textContent = message;
}

function renderStats() {
    const totalDaysEl = document.getElementById('totalDays');
    const totalGoalsEl = document.getElementById('totalGoals');
    const successRateEl = document.getElementById('successRate');
    const avgGoalsEl = document.getElementById('avgGoals');

    // Calculate stats - TERMASUK HARI INI
    const historyDays = appData.stats.totalDays;
    const totalDays = historyDays + 1; // +1 untuk hari ini

    // Total goals completed (history + hari ini)
    const todayCompleted = appData.goals.filter(g => g.completed).length;
    const totalCompleted = appData.stats.totalGoalsCompleted + todayCompleted;

    // Calculate success rate (% of days with all goals completed)
    let successCount = 0;

    // Count dari history
    Object.values(appData.history).forEach(day => {
        if (day.total > 0 && day.completed === day.total) {
            successCount++;
        }
    });

    // Cek hari ini jika ada goals
    if (appData.goals.length > 0) {
        const allCompletedToday = appData.goals.every(g => g.completed);
        if (allCompletedToday) {
            successCount++;
        }
    }

    const successRate = totalDays > 0 ? Math.round((successCount / totalDays) * 100) : 0;

    // Calculate average goals per day
    const avgGoals = totalDays > 0 ? (totalCompleted / totalDays).toFixed(1) : 0;

    // Update UI
    totalDaysEl.textContent = totalDays;
    totalGoalsEl.textContent = totalCompleted;
    successRateEl.textContent = `${successRate}%`;
    avgGoalsEl.textContent = avgGoals;
}

function renderCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    calendarGrid.innerHTML = '';

    const today = new Date();

    // Generate last 30 days (reverse order so oldest is first)
    for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateKey = formatDateKey(date);

        const dayEl = document.createElement('div');
        dayEl.className = 'calendar-day';

        // Get history data for this day
        const dayData = appData.history[dateKey];

        if (dayData) {
            if (dayData.total > 0) {
                if (dayData.completed === dayData.total) {
                    dayEl.classList.add('complete');
                } else if (dayData.completed > 0) {
                    dayEl.classList.add('partial');
                } else {
                    dayEl.classList.add('none');
                }
            } else {
                dayEl.classList.add('none');
            }

            dayEl.setAttribute('data-tooltip',
                `${date.getDate()}/${date.getMonth() + 1}: ${dayData.completed}/${dayData.total} goals`);
        } else {
            dayEl.classList.add('none');
            dayEl.setAttribute('data-tooltip', `${date.getDate()}/${date.getMonth() + 1}: No data`);
        }

        // Mark today
        if (dateKey === getTodayDate()) {
            dayEl.classList.add('today');
        }

        calendarGrid.appendChild(dayEl);
    }
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    toastMessage.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ==========================================
// DEBUGGING (Development Only)
// ==========================================

// Uncomment untuk testing
// window.debugApp = {
//     getData: () => appData,
//     clearData: () => {
//         localStorage.removeItem(STORAGE_KEY);
//         location.reload();
//     },
//     simulateDay: () => {
//         const yesterday = new Date();
//         yesterday.setDate(yesterday.getDate() - 1);
//         appData.lastActiveDate = formatDateKey(yesterday);
//         saveData();
//         location.reload();
//     }
// };

// ==========================================
// EXPOSE FUNCTIONS TO GLOBAL SCOPE
// ==========================================
// Diperlukan agar onclick di HTML bisa akses fungsi-fungsi ini

window.handleToggleGoal = handleToggleGoal;
window.handleDeleteGoal = handleDeleteGoal;

console.log('Daily Goal Tracker initialized! 🎯');
