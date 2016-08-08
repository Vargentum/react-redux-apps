import {flashCreator} from 'redux/modulesSinon'
// import reducer, { initialState } from 'redux/modules/Simon'

// describe('(Redux) Simon', () => {
//   describe('(Reducer)', () => {
//     it('sets up initial state', () => {
//       expect(reducer(undefined, {})).to.eql(initialState)
//     })
//   })
// })

// describe(`flashCreator`, () => {

//   it(`should generate sequences`, () => {
//     expect(flashCreator.next()).to;
//   });
// });



/*

ACs:

- press start button
    - switch status (in progress)
    - generate first seq
    - wait for input
- correct user input
    - check win?
        - true
            - notify user
            - reset game
        - false
            - increase level counter
            - generate next seq
- incorrect input
    - notify user
    - check mode?
        - strict: reset game
        - normal: wait for input


*/