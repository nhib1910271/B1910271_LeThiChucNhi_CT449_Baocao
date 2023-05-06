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
        }
    };
</script>

<template>
    <header class="header">
        <div class="container py-1">
            <div class="d-flex justify-content-between align-items-center">
                <router-link to="/">
                    <img src="@/assets/images/logo_footer.png" height="70"/>
                </router-link>
                <nav class="d-flex nav">
                    <router-link to="/" class="mx-3 fw-bold nav-link">
                        Trang chủ
                    </router-link>
                    <router-link to="/tours" class="mx-3 fw-bold nav-link">
                        Địa điểm
                    </router-link>
                    <router-link to="/contact" class="mx-3 fw-bold nav-link">
                        Liên hệ
                    </router-link>
                    <router-link to="/login" v-if="loginStore.isLogin === false" class="mx-3 fw-bold nav-link">
                        Đăng nhập
                    </router-link>
                    <router-link to="/register" v-if="loginStore.isLogin === false" class="ms-3 fw-bold nav-link">
                        Đăng ký
                    </router-link>
                    <router-link to="/my-tour" v-if="loginStore.isLogin === true" class="mx-3 fw-bold nav-link">
                        Tour của bạn
                    </router-link>
                    <span @click="onLogout" v-if="loginStore.isLogin === true"  class="ms-3 fw-bold nav-link" style="cursor: pointer;">
                        Đăng xuất
                    </span>
                </nav>
            </div>
        </div>
    </header>
</template>

<style scoped>
    .header {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        z-index: 20;
        background-color: rgba(31, 83, 113, 0.3);
        backdrop-filter: blur(8px);
    }

    .nav * {
        font-size: 20px;
    }

    .nav-link {
        color: white;
    }

    .nav-link:hover {
        color: var(--main-color);
    }

    .nav-link[aria-current="page"] {
        color: rgb(79, 134, 207);
    }
</style>