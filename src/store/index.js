import {createStore} from "vuex";

const getDefaultState = () => ({
    roles: [],
    users: [],
    appointments: [],
    date: new Date().toISOString().split('T')[0],
    activeTab: {
        id: 2,
        canEdit: false
    },
    user: null,
    popUp: {
        isOpen: false,
        name: null,
        extra: {}
    }
})

export default createStore({
    state: getDefaultState(),
    getters: {
        getRoles: state => state.roles,
        getUsers: state => state.users,
        getPopup: state => state.popUp,
        getAppointments: state => state.appointments,
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
            state.popUp.isOpen = false;
            setTimeout(() => {
                state.popUp.name = null
                state.popUp.extra = {}
            }, 300);
        },
        clearUser: (state) => {
            state.user = null;
        },
        clearStore(state) {
            Object.assign(state, getDefaultState());
        }
    },
    actions: {
        fetchData({state, commit}, {serverUrl, path, action, query = null, router = null}) {
            fetch(`${serverUrl}/${path}?${query ? new URLSearchParams(query) : ''}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                if (!res.ok) throw new Error(res.statusText)
                return res.json()
            }).then(data => {
                commit(action, data)
            }).catch(err => {
                router ? router.push({name: 'Auth'}) : null
                alert(err)
            })
        },
        createData({state, commit, dispatch}, {serverUrl, path, body, query, action}) {
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
                dispatch('fetchData', {serverUrl: serverUrl, path: path, query: query, action: action})
                commit('clearPopup')
            }).catch(err => {
                alert(err)
            })
        },
        updateData({state, commit, dispatch}, {serverUrl, path, body, action}) {
            fetch(`${serverUrl}/${path}`, {
                method: "PATCH",
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }).then(res => {
                if (!res.ok) throw new Error(res.statusMessage)
                return res.json()
            }).then(() => {
                dispatch('fetchData', {serverUrl: serverUrl, path: path, action: action})
                commit('clearPopup')
            }).catch(err => alert(err))
        },
        deleteData({state, commit, dispatch}, {serverUrl, path, body, action}) {
            fetch(`${serverUrl}/${path}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }).then(res => {
                if (!res.ok) throw new Error(res.statusMessage)
                return res.json()
            }).then(() => {
                dispatch('fetchData', {serverUrl: serverUrl, path: path, action: action})
                commit('clearPopup')
            }).catch(err => alert(err))
        }
    },
    modules: {},
});
