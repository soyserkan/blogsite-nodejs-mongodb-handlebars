const moment = require('moment');
module.exports = {
    select: (param, options) => options.fn(this).replace(new RegExp(' value=\"' + param + '\"'), '$&selected="selected"'),
    generateTime: (date, format) => moment(date).format(format),
    limitString: (string, length) => (string.length > length) ? string.substr(0, length) + '...' : string,
    paginate: (options) => {
        let output = '';
        if (options.hash.current === 1) {
            output += `<li class="page-item disabled"><a class="page-link">İlk</a></li>`;
        } else {
            output += `<li class="page-item "><a href="?page=1" class="page-link">İlk</a></li>`;
        }
        let i = (Number(options.hash.current) > 5 ? Number(options.hash.current) - 4 : 1);

        if (i !== 1) {
            output += `<li class="page-item disabled"><a class="page-link">...</a></li>`;
        }
        for (; i <= (Number(options.hash.current) + 4) && i <= options.hash.pages; i++) {

            if (i === options.hash.current) {
                output += `<li class="page-item active"><a class="page-link">${i}</a></li>`;
            } else {
                output += `<li class="page-item"><a href="?page=${i}" class="page-link">${i}</a></li>`;
            }

            if (i === Number(options.hash.current) + 4 && i < options.hash.pages) {
                output += `<li class="page-item disabled"><a class="page-link">...</a></li>`;
            }
        }

        if (options.hash.current === options.hash.pages) {
            output += `<li class="page-item disabled"><a class="page-link">Son</a></li>`;
        } else {
            output += `<li class="page-item "><a href="?page=${options.hash.pages}" class="page-link">Son</a></li>`;
        }

        return output;
    }
}