import request from './Request';

let fetchAllContributors = () => {
    return request('get', 'contributors/all')
}

const ContributorsService = {
    fetchAllContributors,
}

export default ContributorsService;