<script>
    import AdminHeader from "@/components/AdminHeader.vue";
    import AdminSideBar from "@/components/AdminSideBar.vue";

    export default {
        components: {
            AdminHeader,
            AdminSideBar,
        },

    };
</script>

<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-2 px-0 admin-side-bar">
                <AdminSideBar />
            </div>
            <div class="col-10 offset-2">
                <AdminHeader />
                <router-view />
            </div>
        </div>
    </div>
</template>

<style>
    .admin-side-bar{
        background-color: #dae9ea;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
    }
</style>