<script>
    import User from "@/services/user.service"
    import { useLoginStore, useHistory } from "@/stores/useStore"
    export default {
        data() {
            const loginStore = useLoginStore();
            const history = useHistory();
            return {
                account: {
                    email: "",
                    password: "",
                },
                fail: null,
                loginStore,
                history,
            };
        },
        methods: {
            async onSubmit(data) {
                try {
                    this.loginStore.user = await User.login(data);
                    this.loginStore.isLogin = true;
                    if(this.loginStore.user.type === "admin") {
                        this.$router.push("/admin");
                    } else {
                        if(this.history.prevPage !== "") {
                            this.$router.push(this.history.prevPage);
                            this.history.prevPage = "";
                        } else {
                            this.$router.push("/");
                        }
                        
                    }
                } catch (err) {
                    this.fail = err.response.data.message;
                }
            }
        }
    }
</script>

<template>
    <div class="wrapper">
        <img src="@/assets/images/banner/6.jpg">
    </div>
    <form @submit.prevent="onSubmit(this.account)" class="login-form px-5 py-4 rounded-4">
        <div class="mb-2 text-center">
            <img src="@/assets/images/logo.png" />
        </div>
        <div class="form-floating mb-4">
            <input 
                required
                type="email" id="email"
                class="form-control" 
                placeholder="E-mail"
                v-model="this.account.email"
            >
            <label for="email">Email</label>
        </div>
        <div class="form-floating mb-4">
            <input 
                required
                id="pass" 
                type="password" 
                class="form-control"  
                placeholder="Password"
                v-model="this.account.password"
            >
            <label for="pass">Mật khẩu</label>
        </div>
        <div class="mb-4">
            <span class="mb-1 text-warning" v-if="this.fail != null">
                <i class="fa-solid fa-triangle-exclamation"></i>
                {{this.fail}}
            </span>
            <button type="submit" class="btn btn-lg btn-danger w-100">Đăng Nhập</button>
        </div>
        <div class="text-center text-white">
            <span class="fst-italic fw-bold btn-link me-2">Bạn chưa có tài khoản?</span>
            <router-link to="/register" class="fw-bolder">Đăng ký ngay</router-link>
        </div>
    </form>
</template>

<style>
    .wrapper {
        overflow-x: hidden;
        position: relative;
    }

    .wrapper img {
        width: 100vw;
        height: 100vh;
    }

    .wrapper::after {
        content: "";
        top: 0;
        width: 100%;
        height: 100%;
        background-image: linear-gradient(#00000099 , #00000033);
        position: absolute;
        z-index: 2;
    }

    .login-form {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -175px);
        z-index: 3;
        background-color: #ffffff40;
        backdrop-filter: blur(10px);
        width: 35%;
    }

    .login-form a:hover {
        color: gold;
    }

</style>