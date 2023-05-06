<script>
    import UserHeader from "@/components/UserHeader.vue";
    import UserFooter from "@/components/UserFooter.vue";

    export default {
        components: {
            UserHeader,
            UserFooter,
        },

    };
</script>

<template>
    <div>
        <UserHeader />
        <main>
            <router-view />
        </main>
        <UserFooter />
    </div>
</template>