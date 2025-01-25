import {createStore} from "vuex";

export default createStore({
    state: {
        roles: [],
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
        getRoles: state => state.roles,
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
        setRoles: (state, payload) => {
            state.roles = payload
        },
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
        },
        clearStore: (state) => {
            Object.assign(state, {
                roles: [],
                users: [],
                appointments: [],
                date: new Date().toISOString().split('T')[0],
                activeTab: 2,
                user: null,
                popUp: {
                    isOpen: false,
                    name: null
                }
            })
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
        },
        fetchRoles({state, commit}, {serverUrl}) {
            const token = sessionStorage.getItem('accessToken')
            fetch(`${serverUrl}/roles`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                if (!res.ok) throw new Error(res.statusMessage)
                return res.json()
            }).then(data => {
                commit('setRoles', data)
            }).catch(err => {
                alert(err)
            })
        },
        createData({state, commit, dispatch}, {serverUrl, path, body, callBackName}) {
            fetch(`${serverUrl}/${path}`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }).then(res => {
                if (!res.ok) {
                    return res.json().then(err => {
                        throw new Error(err.error)
                    })
                }
                return res.json()
            }).then(() => {
                dispatch(callBackName, {serverUrl: serverUrl})
            }).catch(err => {
                alert(err)
            })
        }
    },
    modules: {},
});
