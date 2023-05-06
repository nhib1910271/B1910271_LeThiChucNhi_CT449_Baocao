<script>
    import OrderService from '@/services/order.service';
    import { useLoginStore } from "@/stores/useStore";
    export default {
        data() {
            const loginStore = useLoginStore();
            return {
                orders: [],
                loginStore,
            }
        },
        methods: {
            async getData() {
                this.orders = await OrderService.getByUser(this.loginStore.user._id);
                this.orders = this.orders.reverse()
            },
        },
        created() {
            this.getData();
        }
    }
</script>

<template>
    <div class="content container mb-4">
        <div class="text-center mb-3">
            <span class="fs-4 fw-bold text-success border-bottom border-2 border-success px-2">Tour đã đặt</span>
        </div>
        <table class="table table-bordered mb-0">
            <thead>
                <tr class="table-secondary text-center">
                    <th scope="col">Tour</th>
                    <th scope="col">Giá trị</th>
                    <th scope="col">Số người</th>
                    <th scope="col">Ngày khởi hành</th>
                    <th scope="col">Ngày đặt tour</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, i) in this.orders">
                    <td class="align-middle fw-semibold col-5">{{item.tourId.name}}</td>
                    <td class="text-center align-middle">
                        {{new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'})
                            .format(item.total)
                        }}
                    </td>
                    <td class="align-middle">
                        <div>Người lớn: {{item.adult}}</div>
                        <div>Trẻ em: {{item.child}}</div>
                    </td>
                    <td class="text-center align-middle">
                        {{new Date(item.tourId.start).toLocaleDateString("vi-VN")}}
                    </td>
                    <td class="text-center align-middle">
                        {{new Date(Date.parse(item.createdAt)).toLocaleString()}}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style>
</style>