<script>
    import { useLoginStore } from "@/stores/useStore";
    export default {
        data() {
            const loginStore = useLoginStore();
            return {
                loginStore,
            };
        },
        methods: {
            async onLogout() {
                this.loginStore.user = {};
                this.loginStore.isLogin = false;
                this.$router.push("/login")
            }
        },
    };
</script>
<template>
    <div class="d-flex justify-content-end align-items-center py-2">
        <div class="dropdown">
            <a data-bs-toggle="dropdown" class="d-block">
                <img 
                    :src="(this.loginStore.user.avt != null) 
                        ? '@/assets/images/' + this.loginStore.user.avt 
                        : '../src/assets/images/avt.png'"
                    width="45" height="45" class="rounded-circle border border-success border-2"/>
            </a>
            <ul class="dropdown-menu pb-0">
                <li class="px-3 border-bottom mb-2">
                    <div class="d-flex">
                        <img 
                            :src="(this.loginStore.user.avt != null) 
                                ? '@/assets/images/' + this.loginStore.user.avt 
                                : '../src/assets/images/avt.png'"
                            width="100" height="100" class="rounded-circle border border-success"
                        />
                        <div class="ms-2">
                            <div class="fw-bold lh-sm">{{this.loginStore.user.name}}</div>
                            <small>{{this.loginStore.user.email}}</small>
                        </div>
                    </div>
                </li>
                <li class="px-3 mb-2"><i class="fa-regular fa-address-book me-1"></i>Xem hồ sơ</li>
                <li class="px-3 mb-2"><i class="fa-solid fa-gear icon me-1"></i>Cài đặt</li>
                <button 
                    class="btn w-100 border-0 text-start px-3 border-top fw-semibold text-danger py-2" 
                    @click="onLogout"
                >
                    <i class="fa-solid fa-arrow-right-from-bracket icon"></i> Đăng xuất
                </button>
            </ul>
      </div>   
    </div>
</template>
<style>
</style>