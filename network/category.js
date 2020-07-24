import {request} from './request'

/**分类数据 */
export function _cateGory(){
    return request({
        url:'/api/public/v1/categories',
    })
}