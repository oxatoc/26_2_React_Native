class DateMapper {
  getDdMmYy(date: Date | undefined) {
    if (!date) {
      return '';
    }

    let str = date.getDate().toString().padStart(2, '0');
    str += '.';
    str += (date.getMonth() + 1).toString().padStart(2, '0');
    str += '.';
    str += date.getFullYear();
    return str;
  }
  getHhMmSs(date: Date | undefined) {
    if (!date) {
      return '';
    }
    let str = date.getHours().toString().padStart(2, '0');
    str += ':';
    str += date.getMinutes().toString().padStart(2, '0');
    str += ':';
    str += date.getSeconds().toString().padStart(2, '0');
    return str;
  }
}
export default new DateMapper();
