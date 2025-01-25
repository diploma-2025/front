import {createStore} from "vuex";

export default createStore({
    state: {
        users: [],
        appointments: [],
        date: new Date().toISOString().split('T')[0],
        activeTab: 2,
        user: null,
        popUp: {
            isOpen: false,
            name: null
        }
    },
    getters: {
        getUsers: state => state.users,
        getPopup: state => state.popUp,
        getAppointments: state => {
            console.log(state.appointments)
            return state.appointments
        },
        getDate: state => state.date,
        getActiveTab: state => state.activeTab,
        getUser: state => state.user,
        getPopUp: state => state.popUp,
    },
    mutations: {
        setUsers: (state, payload) => {
            state.users = payload
        },
        setPopup: (state, payload) => {
            state.popUp = payload;
        },
        setAppointments: (state, appointments) => {
            state.appointments = appointments;
        },
        setDate: (state, date) => {
            state.date = new Date(date).toISOString().split('T')[0];
        },
        setActiveTab: (state, tab) => {
            state.activeTab = tab
        },
        setUser: (state, user) => {
            state.user = user;
        },
        clearPopup: (state) => {
            state.popUp = {
                isOpen: false,
                name: null
            };
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
        },
        fetchUsers({state, commit}, {serverUrl}) {
            const token = sessionStorage.getItem('accessToken')
            fetch(`${serverUrl}/user/users`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                if (!res.ok) throw new Error(res.statusMessage)
                return res.json()
            }).then(data => {
                commit('setUsers', data)
            }).catch(err => {
                alert(err)
            })
        }
    },
    modules: {},
});
