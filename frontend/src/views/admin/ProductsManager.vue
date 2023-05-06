<script>
    import { useLoginStore } from "@/stores/useStore";
    import TourService from '@/services/tour.service';

    export default {
        data() {
            const loginStore = useLoginStore();
            return {
                loginStore,
                tours: [],
                data: {},
                imageInput: '',
            };
        },
        methods: {
            async getData() {
                this.tours = await TourService.getAll();
                this.tours = this.tours.reverse();
            },
            changeImage(e) {
                const fileName = e.target.files[0];
                this.imageInput = fileName;
            },
            async handleUpdate () {
                if(confirm("Bạn chắc chắn muốn cập nhật?")) {
                    try { 
                        if (this.imageInput.name != null) {
                            this.data.avt = this.imageInput.name
                        }
                        await TourService.update(this.data._id, {...this.data});
                        this.getData();
                        this.$toast.success('Cập nhật Tour thành công',
                            {
                                position: "top-right",
                                duration: 3000,
                            }
                        );
                        this.data = {}
                    } catch (err) {
                        this.$toast.error('Cập nhật Tour thất bại.',
                            {
                                position: "top-right",
                                duration: 3000,
                            }
                        );
                    }
                }
            },
            async handleAdd() {
                try {
                    this.data.avt = this.imageInput.name
                    await TourService.create({...this.data});
                    this.getData();
                    this.$toast.success('Thêm mới Tour thành công',
                        {
                            position: "top-right",
                            duration: 3000,
                        }
                    );
                    this.data = {}
                } catch (err) {
                    this.$toast.error('Thêm mới Tour thất bại.',
                        {
                            position: "top-right",
                            duration: 3000,
                        }
                    );
                }

            },
            async handleDelete(id) {
                if(confirm("Bạn chắc chắn muốn xóa Tour này?")) {
                    await TourService.delete(id);
                    this.$toast.success('Xóa Tour thành công',
                        {
                            position: "top-right",
                            duration: 3000,
                        }
                    );
                    this.getData();
                }
            }
        },
        beforeMount() {
            if(this.loginStore.isLogin === false && this.loginStore.user.type !== "admin") 
                this.$router.push("/login")
        },
        created() {
            this.getData();
        },
    };
</script>

<template>
    <div>
        <div class="d-flex justify-content-between align-items-center">
            <h3 class="fw-bold text-center text-primary my-3">QUẢN LÝ TOUR</h3>
            <div>
                 <button class="btn btn-outline-primary fw-bold" data-bs-toggle="modal" data-bs-target="#add-edit-tour">
                    <i class="fa-solid fa-plus"></i>
                    Thêm Tour
                </button>
            </div>
        </div>
        <table class="table table-bordered">
            <thead>
                <tr class="table-primary text-center">
                    <th scope="col">STT</th>
                    <th scope="col">Ảnh</th>
                    <th scope="col">Tên</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Giá vé</th>
                    <th scope="col">Ngày khởi hành</th>
                    <th scope="col" colspan="2" class="col-1">Tác vụ</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, i) in this.tours" :key="item._id">
                    <td class="text-center align-middle">{{i+1}}</td>
                    <td class="text-center align-middle">
                        <img :src="'../src/assets/images/tours/' + item.avt" height="60">
                    </td>
                    <td class="align-middle col-5">
                        <div class="prod-name">{{item.name}}</div>
                        <div>
                            <span class="me-2"><i class="fa-regular fa-clock"></i>Thời gian:</span>
                            {{item.day}} ngày {{item.night}} đêm
                        </div>
                    </td>
                    <td class="text-center align-middle">
                        {{item.tourists}} người
                    </td>
                    <td class="text-center align-middle">
                        {{ new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'})
                                .format(item.price)
                        }}
                    </td>
                    <td class="text-center align-middle">
                        {{new Date(item.start).toLocaleDateString("vi-VN")}}
                    </td>
                    <td class="text-center align-middle">
                        <button 
                            class="btn text-success fs-4" 
                            data-bs-toggle="modal" data-bs-target="#add-edit-tour"
                            @click="this.data = item"
                        >
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                    </td>
                    <td class="text-center align-middle">
                        <button class="btn text-danger fs-4" @click="this.handleDelete(item._id)">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="modal fade" id="add-edit-tour" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="modal-title text-danger fs-4 fw-bold">Chỉnh sửa Tour</div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form>
                        <div class="modal-body">
                            <div class="mb-3">
                                <label for="tour" class="form-label text-primary fw-bold">Tên Tour</label>
                                <input 
                                    required
                                    type="text" id="tour"
                                    class="form-control" 
                                    placeholder="Tên Tour"
                                    v-model="this.data.name"
                                >
                            </div>
                            <div class="mb-3">
                                <label for="price" class="form-label text-primary fw-bold">Giá Tour</label>
                                <input 
                                    required
                                    type="number" min="0" id="price" 
                                    class="form-control" 
                                    placeholder="Giá Tour"
                                    v-model="this.data.price"
                                >
                            </div>
                            <div class="mb-3">
                                <label for="num-cus" class="form-label text-primary fw-bold">Số lượng khách</label>
                                <input 
                                    required
                                    type="number" 
                                    id="num-cus" min="1"
                                    class="form-control" 
                                    placeholder="Số lượng khách"
                                    v-model="this.data.tourists"
                                >
                            </div>
                            <div class="mb-3">
                                <div class="d-flex">
                                    <div class="d-flex me-3 align-items-center justify-content-between flex-fill">
                                        <label for="day" class="form-label text-primary fw-bold text-nowrap mb-0">Số ngày: </label>
                                        <input 
                                            required
                                            type="number" min="0" id="day" 
                                            class="form-control w-50" 
                                            placeholder="Số ngày"
                                            v-model="this.data.day"
                                        >
                                    </div>
                                    <div class="d-flex ms-3 align-items-center justify-content-between flex-fill">
                                        <label for="night" class="form-label text-primary fw-bold text-nowrap mb-0">Số đêm: </label>
                                        <input 
                                            required
                                            type="number" min="0" id="night"
                                            class="form-control w-50" 
                                            placeholder="Số đêm"
                                            v-model="this.data.night"
                                        >
                                    </div>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="start" class="form-label text-primary fw-bold">Ngày khởi hành</label>
                                <input 
                                    id="start"
                                    type="date" 
                                    class="form-control" 
                                    v-model="this.data.start"
                                >
                            </div>
                            <div class="mb-3">
                                <label for="img" class="form-label text-primary fw-bold">Hình ảnh</label>
                                <input 
                                    id="img"
                                    type="file" 
                                    class="form-control" 
                                    @change="this.changeImage"
                                >
                            </div>
                            <div class="mb-3">
                                <label for="info" class="form-label text-primary fw-bold">Điểm nhấn nổi bật</label>
                                <textarea 
                                    required
                                    class="form-control" id="info" rows="5"
                                    v-model="this.data.description"
                                ></textarea>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-warning me-2" data-bs-dismiss="modal">Hủy</button>
                            <button 
                                v-if="this.data._id != null" 
                                type="button" class="btn btn-success"
                                data-bs-dismiss="modal"
                                @click="this.handleUpdate()"
                            >
                                Cập nhật
                            </button>
                            <button 
                                v-else 
                                type="button" class="btn btn-success" 
                                data-bs-dismiss="modal"
                                @click="this.handleAdd()"
                            >
                                Thêm
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    .prod-name {
        font-weight: 700;
        line-height: 1.1;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }
</style>