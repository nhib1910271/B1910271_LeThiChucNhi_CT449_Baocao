<script>
    import TourService from '@/services/tour.service';
    import OrderService from '@/services/order.service';
    import { useLoginStore, useHistory } from "@/stores/useStore";
    export default {
        data() {
            const loginStore = useLoginStore();
            const history = useHistory();
            return {
                tour: {},
                loginStore,
                dataOrder: {},
                history,
            }
        },
        methods: {
            async getData() {
                this.tour = await TourService.get(this.$route.params.id);
                this.dataOrder.name = this.loginStore.user.name
                this.dataOrder.email = this.loginStore.user.email
                this.dataOrder.phone = this.loginStore.user.phone
            },
            async handleSubmit() {
                try {
                    await OrderService.create({
                        ...this.dataOrder,
                        useId: this.loginStore.user._id,
                        tourId: this.tour._id,
                        total: (this.tour.price * this.dataOrder.adult) + ((this.tour.price * 0.5) * this.dataOrder.child),
                    })
                    this.dataOrder = {};
                    this.$toast.success('Đặt tour thành công! \nChúng tôi sẽ sớm liên hệ với bạn.',
                        {
                            position: "top",
                            duration: 5000,
                        }
                    );
                } catch (err) {
                    this.$toast.error('Đặt tour không thành công!',
                        {
                            position: "top",
                            duration: 3000,
                        }
                    );
                }
            },
            handleNavigate() {
                this.history.prevPage = this.$route.path
                this.$router.push("/login")
            }
        },
        created() {
            this.getData()
        }
    }
</script>

<template>
    <div class="content container mb-4" v-if="this.tour._id != null">
        <div class="row mb-5">
            <div class="col-7">
                <img :src="'../src/assets/images/tours/' + this.tour.avt" class="w-100 rounded-4"/>
            </div>
            <div class="col-5 d-flex flex-column">
                <div class="fs-2 tour-name text-primary">{{this.tour.name}}</div>
                <div class="py-3 border-top mt-3">
                    <div>
                        <b><i class="me-2 fas fa-car-side"></i>Ngày khởi hành: </b>
                        {{new Date(this.tour.start).toLocaleDateString("vi-VN")}}
                    </div>
                    <div><b><i class="me-2 fas fa-clock"></i>Thời gian:</b> {{this.tour.day}} ngày {{this.tour.night}} đêm</div>
                    <div><b><i class="me-2 fas fa-user-friends"></i>Số lượng Khách: </b>{{this.tour.tourists}} người</div>
                </div>
                <div class="tour-price fw-bold text-success py-5 mt-auto border-top">
                    {{new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'})
                        .format(this.tour.price)
                    }}
                    <span class="fs-5 text-dark fw-normal"> /người</span></div>
                <div class="d-flex">
                    <button class="btn btn-lg btn-success w-50 me-2" 
                        data-bs-toggle="modal" data-bs-target="#order"
                        v-if="this.loginStore.isLogin == true"    
                    >
                        Đặt Ngay
                    </button>
                    <button v-else @click="this.handleNavigate()" class="btn btn-danger w-50 me-2" >
                        Đặt Ngay
                    </button>
                    <button class="btn btn-lg btn-warning w-50" data-bs-toggle="modal" data-bs-target="#advice">Liên hệ  </button>
                </div>
            </div>
        </div>
        <div >
            <div class="d-flex justify-content-center">
                <div class="nav" id="list-tab" role="tablist">
                    <div class="nav-link active text-dark" id="infotour-list" data-bs-toggle="list" href="#infotour" role="tab" aria-controls="infotour">Thông tin tour</div>
                    <div class="nav-link text-dark" id="schdule-list" data-bs-toggle="list" href="#schdule" role="tab" aria-controls="schdule">Lịch trình</div>
                </div>
            </div>
            <div>
                <div class="tab-content" id="nav-tabContent">
                    <div class="tab-pane fade show active" id="infotour" role="tabpanel" aria-labelledby="infotour-list">
                        <b class="mt-3">Điểm nhấn nổi bật</b>
                        <p class="ps-3">{{this.tour.description}}</p>
                        <p class="ps-3">
                            <p class="mb-3 text-danger fst-italic">*Giá vé sẽ được cập nhật liên tục tùy vào tình hình thực tế</p>
                            <div class="fw-semibold fst-italic">
                                Chúng tôi sẽ liên hệ ngay với bạn nếu có bất kỳ sự thay đổi nào về lịch trình</div>
                        </p>
                    </div>
                    <div class="tab-pane fade" id="schdule" role="tabpanel" aria-labelledby="schdule-list" style="min-height: 350px">
                        <div class="mb-3 text-danger fst-italic">*Đang cập nhật.....</div>
                        <div class="fw-semibold fst-italic">
                            Vui lòng liên hệ số hotline hoặc đến trực tiếp cơ sở chúng tôi để được tư vấn nhiều hơn!</div>
                </div>
            </div>
        </div>
    </div> </div>

        <div class="modal fade" id="order" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="modal-title fs-3 text-secondary fw-bold">Thông tin đặt tour</div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    
                    <div class="modal-body">
                        <div class="alert alert-danger py-1 px-2" role="alert">
                            <i class="fa-solid fa-circle-info"></i>
                            Chúng tôi sẽ liên hệ với bạn để xác nhận thông qua số điện thoại. Vui lòng điền đầy đủ và chính xác các thông tin sau!!
                        </div>
                        <div class="mb-3">
                            <input 
                                required
                                type="text" class="form-control" 
                                placeholder="Họ tên"
                                v-model="this.dataOrder.name"
                            >
                        </div>
                        <div class="mb-3">
                            <input 
                                required
                                type="email" class="form-control" 
                                placeholder="E-mail"
                                v-model="this.dataOrder.email"
                            >
                        </div>
                        <div class="mb-3">
                            <input 
                                required
                                type="text" class="form-control" 
                                placeholder="Số điện thoại"
                                v-model="this.dataOrder.phone"
                            >
                        </div>
                        <div class="mb-3">
                            <input
                                required 
                                type="text" class="form-control" 
                                placeholder="Địa chỉ cụ thể"
                                v-model="this.dataOrder.address"
                            >
                        </div>
                        <div class="mb-3 row">
                            <div class="col-6">
                                <input 
                                    required
                                    type="number" min="0" class="form-control" 
                                    placeholder="Người lớn"
                                    v-model="this.dataOrder.adult"
                                >
                            </div>
                            <div class="col-6">
                                <input 
                                    required
                                    type="number" min="0" class="form-control" 
                                    placeholder="Trẻ em"
                                    v-model="this.dataOrder.child"
                                >
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger me-2" data-bs-dismiss="modal">Hủy</button>
                        <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#confirm">Tiếp tục</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="confirm" tabindex="-1" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="modal-title fs-2 fw-bold">Xác nhận đặt tour</div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="fw-semibold text-primary" style="font-size: 18px;">
                            <span class="text-danger">Tour: </span> 
                            {{this.tour.name}}
                        </div>
                        <div>Khởi hành ngày: {{this.tour.start}}</div>
                        <div>Thời gian: {{this.tour.day}} ngày {{this.tour.night}} đêm</div>
                        <div class="mt-3">
                            <b>Số lượng vé:</b>
                            <div class="ms-3 d-flex justify-content-between">
                                <span class="fw-semibold">+ Người lớn:</span>
                                <span>
                                    {{this.dataOrder.adult}} x {{this.tour.price}} = 
                                    <b>{{new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'})
                                    .format(this.tour.price * this.dataOrder.adult)}}</b>
                                </span>
                            </div>
                            <div class="ms-3 d-flex justify-content-between">
                                <span class="fw-semibold">+ Trẻ em:</span>
                                <span>
                                    {{this.dataOrder.child}} x {{this.tour.price * 0.5}} = 
                                    <b>{{new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'})
                                    .format((this.tour.price * 0.5) * this.dataOrder.child)}}</b>
                                </span>
                            </div>
                        </div>
                        <div class="mt-3 fs-4 d-flex justify-content-between align-items-end">
                            <b>Thanh toán:</b>
                            <span class="fw-bolder fs-4 text-danger">
                                {{new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'})
                                    .format((this.tour.price * this.dataOrder.adult) + ((this.tour.price * 0.5) * this.dataOrder.child))}}
                            </span>
                        </div>
                    </div>
                    <div class="modal-footer d-flex justify-content-between align-items-end">
                        <small class="flex-1 text-wrap text-danger w-50 fst-italic lh-sm">
                            * Vui lòng kiểm tra lại thông tin
                        </small>
                        <div>
                            <button type="button" class="btn btn-danger me-2" data-bs-toggle="modal" data-bs-target="#order">Trở lại</button>
                            <button 
                                type="button" class="btn btn-success me-2" 
                                data-bs-dismiss="modal"
                                @click="this.handleSubmit()"
                            >
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="advice" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="mb-2 fs-5 fw-bold text-danger">Liên hệ tư vấn</div>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-center">
                    <div class="fw-bolder text-success mb-2 fs-5">CÔNG TY TRÁCH NHIỆM HỮU HẠN DU LỊCH DECEMBER</div>
                    <div class="mb-1">Đường 30/4, phường Xuân Khánh, quận Ninh Kiều, Tp Cần Thơ</div>
                    <div><span class="fw-bold mb-1">E-mail: </span>decembertravel@gmail.com.vn</div>
                    <div><span class="fw-bold mb-1">Hotline: </span>0907077111</div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary me-2" data-bs-dismiss="modal">Xác nhận</button>
                </div>
            </div>
        </div>
        </div>
   
</template>

<style>

.tour-name {
    font-weight: 800;
    line-height: 1.3;
    color: var(--main-color);
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.tour-price {
    font-size: 30px;
}
.nav-link {
    color: black;
    font-size: 20px;
    font-weight: 700;
}
.nav-link.active {
    color: var(--main-color) !important;
    border-bottom: 3px solid var(--main-color);
}
.w-80 {
    width: 80%;
}
</style>