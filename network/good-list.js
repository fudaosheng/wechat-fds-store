import {request} from "./request"

/**商品列表 */
export function _good_List(query,cid,pagenum,pagesize){
    return request({
        url:'/api/public/v1/goods/search',
        data:{
            query:query,
            cid:cid,
            pagenum:pagenum,
            pagesize:pagesize,
        }
    })
}