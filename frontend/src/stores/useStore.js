import { defineStore } from 'pinia'

export const useLoginStore = defineStore("userLogin", {
    state: () => ({
        user: {},
        isLogin: false,
    })
})

export const useHistory = defineStore("history", {
    state: () => ({
        prevPage: "",
    })
})