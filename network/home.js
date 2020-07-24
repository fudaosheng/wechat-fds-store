import {request} from "./request"

export function _Swiper(){
    return request({
        url:'/api/public/v1/home/swiperdata'
    });
}
/**分类数据 */
export function _Cate(){
    return request({
        url:'/api/public/v1/home/catitems',
    })
}
/**首页主要数据 */
export function _foolData(){
    return request({
        url:'/api/public/v1/home/floordata'
    })
}