module.exports = {

    select: (param, options) => {
        return options.fn(this).replace(new RegExp(' value=\"' + param + '\"'), '$&selected="selected"');
    }

}