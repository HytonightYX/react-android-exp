/**
 * 提取省市县
 * @param full
 * @param type
 * @return {*}
 */
export const getAddr = (full, type='shi') => {
	const reg = /.+?(省|市|自治区|自治州|县|区)/g
	const ret = full.match(reg)
	if (!ret[1]) ret[1] = ''
	return ret
}
