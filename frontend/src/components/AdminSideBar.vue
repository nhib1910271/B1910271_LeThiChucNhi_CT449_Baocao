
<template>
    <div class="text-center py-2">
        <router-link to="/admin">
            <img src="@/assets/images/logo_footer.png" height="200">
        </router-link>
    </div>
    <div class="ms-2 nav flex-column">
        <div class="nav-item border-bottom border-white py-2">
            <router-link to="/admin/" class="nav-link text-blue fw-semibold">
                <i class="fa-solid fas fa-tasks"></i> Quản lý Tour
            </router-link>
        </div>
        <div class="nav-item border-bottom border-white py-2">
            <router-link to="/admin/orders" class="nav-link text-blue fw-semibold">
                <i class="fa-solid fas fa-calendar-check"></i> Quản lý Tour đã đặt
            </router-link>
        </div>
        <div class="nav-item border-bottom border-white py-2">
            <router-link to="/admin/users" class="nav-link text-blue fw-semibold">
                <i class="fa-regular fas fa-user"></i> Quản lý Người Dùng
            </router-link>
        </div>
    </div>
</template>

<style>    
    .nav-link:hover {
        color: var(--main-color) !important;
    }

    .nav-link[aria-current="page"] {
        color: rgb(186, 44, 44) !important;
    }
</style>