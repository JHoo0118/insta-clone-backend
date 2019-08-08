export const isAuthenticated = (request) => {
    if(!request.user) {
        throw Error('먼저 로그인을 해주세요.');
    }
    return;
}