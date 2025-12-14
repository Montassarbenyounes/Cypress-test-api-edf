describe('all user', () => {

   it('get all user', () => {
cy.request({
method:'GET',
url:'https://dummyjson.com/users',

}).then((response ) =>{
expect(response.status).to.eq(200);
expect(response.body).to.have.all.keys('skip','users' , 'total' ,'limit')
})
});
it('Login user and get tokens' , () => {
cy.request ( {
method: 'POST' , 
url:'https://dummyjson.com/user/login',
headers: {
    'Content-Type': 'application/json' },
    body: {
 username:'emilys' ,
    password:'emilyspass'
    }}).then((response ) => {
expect(response.status).to.eq(200) ;
expect(response.body).to.have.property('accessToken')
})

})
it('Get a single user' , () => {
cy.request('https://dummyjson.com/users/1').then((response) => {
    expect(response.status).to.eq(200) ;
    expect (response.body).to.include.keys('id','firstName','lastName','age','phone' )

})

})

it('Search users', () => {
  cy.request({
    method: 'GET',
    url: 'https://dummyjson.com/users/search?q=John'
  }).then((response) => {
    expect(response.status).to.eq(200)
     expect(response.body).to.have.property('users')
    expect(response.body).to.have.property('total')
    expect(response.body).to.have.property('skip')
    expect(response.body).to.have.property('limit')
    expect(response.body.users.length).to.be.greaterThan(0)
    expect(response.body.users[0]).to.have.property('id')
    expect(response.body.users[0]).to.have.property('firstName')
    expect(response.body.users[0]).to.have.property('lastName')
  })
})


})
    