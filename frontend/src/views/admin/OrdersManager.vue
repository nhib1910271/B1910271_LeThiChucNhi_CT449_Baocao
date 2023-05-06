<script>
    import OrderService from '@/services/order.service';
    export default {
        data() {
            return {
                orders: [],
               
            }
        },
        methods: {
            async getData() {
                this.orders = await OrderService.getAll();
                this.orders = this.orders.reverse()
            },
        },
        created() {
            this.getData();
        }
    }
</script>

<template>
    <div>
        <h3 class="fw-bold text-center text-primary my-3">QUẢN LÝ ĐẶT TOUR</h3>  
        <table class="table table-bordered">
            <thead>
                <tr class="table-primary text-center">
                    <th scope="col">THÔNG TIN KHÁCH HÀNG</th>
                    <th scope="col">THÔNG TIN TOUR</th>
                    <th scope="col">SỐ LƯỢNG</th>
                    <th scope="col">THỜI GIAN ĐẶT</th>
                    <th scope="col">TỔNG TIỀN</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, i) in this.orders" :key="item._id">
                    <td class="align-middle col-3">
                        <div class="fw-bold text-success">{{item.name}}</div>
                        <div><b>Email:</b> {{item.email}}</div>
                        <div><b>Số điện thoại:</b> {{item.phone}}</div>
                        <div><b>Địa chỉ:</b> {{item.address}}</div>
                    </td>
                    <td class="align-middle col-4">
                        <div class="fw-bold text-success prod-name">{{item.tourId.name}}</div>
                        <div><b>Ngày khởi hành:</b> {{item.tourId.start}}</div>
                        <div><b>Thời gian</b>: {{item.tourId.day}} ngày {{item.tourId.night}} đêm</div>
                    </td>
                    <td class="align-middle">
                        <div>
                            <span class="fw-semibold me-1"><i class="fa-solid fas fa-male me-1"></i><b>Người lớn:</b></span>
                            {{item.adult > 0 ? item.adult : 0}}
                        </div>
                        <div>
                            <span class="fw-semibold me-1"><i class="fa-solid fa-baby me-1"></i><b>Trẻ em:</b></span>
                            {{item.child > 0 ? item.child : 0}}
                        </div>
                    </td>
                    <td class="text-center fw-bold align-middle">
                        {{new Date(Date.parse(item.createdAt)).toLocaleString()}}
                    </td>
                    <td class="text-center text-danger fw-bold align-middle">
                        {{new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'})
                            .format(item.total)
                        }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style>
    .prod-name {
        font-weight: 900;
        line-height: 1.1;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
</style>                 