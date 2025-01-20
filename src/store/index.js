import {createStore} from "vuex";

export default createStore({
    state: {
        appointments: [],
        date: new Date().toISOString().split('T')[0],
        activeTab: 2,
        user: null,
    },
    getters: {
        getAppointments: state => state.appointments,
        getDate: state => state.date,
        getActiveTab: state => state.activeTab,
        getUser: (state) => state.user,
    },
    mutations: {
        setAppointments(state, appointments) {
            state.appointments = appointments;
        },
        setDate(state, date) {
            state.date = new Date(date).toISOString().split('T')[0];
        },
        setActiveTab(state, tab) {
            state.activeTab = tab
        },
        setUser: (state, user) => {
            state.user = user;
        },
        clearUser: (state) => {
            state.user = null;
        }
    },
    actions: {
        fetchUser({commit}, {serverUrl, router}) {
            const token = sessionStorage.getItem('accessToken')
            fetch(`${serverUrl}/user`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                if (!res.ok) throw new Error("Потрібно повторно авторизуватись")
                return res.json()
            }).then(data => {
                commit('setUser', data)
            }).catch(err => {
                router?.push({name: 'Auth'})
                alert(err)
            })
        },
        fetchAppointments({state, commit}, {serverUrl}) {
            const token = sessionStorage.getItem('accessToken')
            const query = new URLSearchParams({
                date: state.date
            })
            fetch(`${serverUrl}/appointment?${query}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                if (!res.ok) throw new Error(res.statusMessage)
                return res.json()
            }).then(data => {
                commit('setAppointments', data)
            }).catch(err => {
                alert(err)
            })
        }
    },
    modules: {},
});
