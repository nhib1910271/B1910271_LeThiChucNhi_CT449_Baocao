<script>
    import User from "@/services/user.service"
    export default {
        data() {
            return {
                data: {
                    name: "",
                    email: "",
                    password: "",
                    type: "customer"
                },
                fail: null,
            }
        },
        methods: {
            async onSubmit(data) {
                try {
                    await User.create(data);
                    this.$toast.success('Đăng ký thành công!!!',
                        {
                            position: "top",
                            duration: 1000,
                            pauseOnHover: false,
                        }
                    );
                    setTimeout(() => {
                        this.$toast.clear;
                        this.$router.push('/login')
                    }, 1000)
                } catch(err) {
                    this.fail = err.response.data.message;
                }
            }   
        }
    }
</script>

<template>
    <div class="wrapper">
        <img src="@/assets/images/banner/7.jpg">
    </div>
    <form @submit.prevent="onSubmit(this.data)" class="register-form px-5 py-4 rounded-4">
        <div class="mb-2 text-center">
            <img src="@/assets/images/logo.png" />
        </div>
        <div class="mb-4">
            <input 
                required
                type="text"
                class="form-control form-control-lg" 
                placeholder="Họ tên"
                v-model="this.data.name"
            >
        </div>
        <div class="mb-4">
            <input 
                required
                type="email" 
                class="form-control form-control-lg" 
                placeholder="Email"
                v-model="this.data.email"
            >
        </div>
        <div class="mb-4">
            <input 
                required
                type="password" 
                class="form-control form-control-lg" 
                placeholder="Mật khẩu"
                v-model="this.data.password"
            >
        </div>
        <div class="mb-4">
            <input 
                required
                type="password" 
                class="form-control form-control-lg" 
                placeholder="Nhập lại mật khẩu"
                v-model="this.data.password1"
            >
        </div>
        <div class="mb-4">
            <span class="mb-1 text-warning" v-if="this.fail != null">
                <i class="fa-solid fa-triangle-exclamation"></i>
                {{this.fail}}
            </span>
            <button type="submit" class="btn btn-lg btn-danger w-100">Đăng Ký</button>
        </div>
        <div class="text-center text-white">
            <span class="fst-italic fw-bold btn-link me-2">Bạn đã có tài khoản?</span>
            <router-link to="/login" class="fw-bold text-warning">Đăng nhập ngay</router-link>
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
        background-image: linear-gradient(#00000080 , #00000033);
        position: absolute;
        z-index: 2;
    }

    .register-form {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -175px);
        z-index: 3;
        background-color: #ffffff40;
        backdrop-filter: blur(10px);
        width: 35%;
    }

    .register-form a:hover {
        color: red;
    }

</style>