import request from './Request';

let sendEmail = (data) => {
    return request('post', 'misc/sendEmail', data)
}

const APIcalls = {
    sendEmail,
}

export default APIcalls;