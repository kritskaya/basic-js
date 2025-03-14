const { expect, assert } = require('chai');
const { testOptional, checkForThrowingErrors, CONSTANTS } = require('../extensions/index.js');
const { chainMaker } = require('../src/simple-chain.js');

const { CORRECT_RESULT_MSG } = CONSTANTS;

it.optional = testOptional;

Object.freeze(expect);
Object.freeze(assert);

describe('Make chain!', () => {
    //Presence requirement
    describe('variable presence', () => {
        it.optional('object chainMaker exists', () => {
            expect(chainMaker).to.exist;
            const type = typeof chainMaker;
            expect(type).to.be.equal('object');
        });
    });

    describe('base requirements', () => {
        it.optional('chaining works!', () => {
            assert.deepEqual(chainMaker.addLink(function () { }).addLink('2nd').addLink('3rd').removeLink(2).reverseChain().finishChain(), '( 3rd )~~( function () { } )');
        });

        it.optional('throws an Error with message "You can\'t remove incorrect link!" on trying to remove wrong link', function () {
            const res = checkForThrowingErrors.call(this, [
                () => chainMaker.addLink(1).addLink(2).addLink(3).removeLink(0),
                () => chainMaker.addLink(1).addLink(2).addLink(3).removeLink('2nd'),
                () => chainMaker.addLink(1).addLink(2).addLink(3).removeLink(-2),
                () => chainMaker.addLink(1).addLink(2).addLink(3).removeLink(4)
            ], 'You can\'t remove incorrect link!');

            assert.strictEqual(res.every($ => $ === CORRECT_RESULT_MSG), true);
        });
    });

    //Functional requirements
    describe('functional requirements', () => {
        it.optional('function returns correct values', () => {
            assert.deepEqual(chainMaker.addLink('GHI').addLink(null).reverseChain().addLink(333).reverseChain().reverseChain().addLink(0).reverseChain().reverseChain().addLink('GHI').finishChain(), '( null )~~( GHI )~~( 333 )~~( 0 )~~( GHI )');
            
            assert.deepEqual(chainMaker.addLink('8.963').reverseChain().reverseChain().reverseChain().reverseChain().addLink({ 0: 'first', 1: 'second', 'length': 2 }).reverseChain().addLink(3.14).addLink('DEF').reverseChain().finishChain(), '( DEF )~~( 3.14 )~~( 8.963 )~~( [object Object] )');
            
            assert.deepEqual(chainMaker.addLink(false).reverseChain().reverseChain().reverseChain().addLink({ 0: 'first', 1: 'second', 'length': 2 }).addLink(1.233).addLink(false).addLink(1).reverseChain().addLink(1).finishChain(), '( 1 )~~( false )~~( 1.233 )~~( [object Object] )~~( false )~~( 1 )');
            
            assert.deepEqual(chainMaker.reverseChain().reverseChain().addLink(NaN).addLink({ 0: 'first', 1: 'second', 'length': 2 }).addLink({ 0: 'first', 1: 'second', 'length': 2 }).addLink({ 0: 'first', 1: 'second', 'length': 2 }).reverseChain().reverseChain().addLink({ 0: 'first', 1: 'second', 'length': 2 }).addLink(true).finishChain(), '( NaN )~~( [object Object] )~~( [object Object] )~~( [object Object] )~~( [object Object] )~~( true )');
            
            assert.deepEqual(chainMaker.addLink(1).reverseChain().addLink(0).reverseChain().addLink(NaN).addLink(1.233).addLink(null).addLink({ 0: 'first', 1: 'second', 'length': 2 }).reverseChain().addLink({ 0: 'first', 1: 'second', 'length': 2 }).finishChain(), '( [object Object] )~~( null )~~( 1.233 )~~( NaN )~~( 1 )~~( 0 )~~( [object Object] )');
            
            assert.deepEqual(chainMaker.addLink(NaN).addLink(null).addLink(Infinity).addLink(1).reverseChain().addLink(null).reverseChain().addLink({ 0: 'first', 1: 'second', 'length': 2 }).addLink(22).addLink(333).finishChain(), '( null )~~( NaN )~~( null )~~( Infinity )~~( 1 )~~( [object Object] )~~( 22 )~~( 333 )');
            
            assert.deepEqual(chainMaker.addLink(0).addLink(NaN).addLink(1).reverseChain().addLink(0).reverseChain().reverseChain().addLink(1).addLink(Infinity).reverseChain().finishChain(), '( Infinity )~~( 1 )~~( 0 )~~( 0 )~~( NaN )~~( 1 )');
            
            assert.deepEqual(chainMaker.addLink('ABC').reverseChain().addLink(Infinity).addLink(null).addLink('8.963').addLink(false).addLink(Infinity).reverseChain().addLink(false).reverseChain().finishChain(), '( false )~~( ABC )~~( Infinity )~~( null )~~( 8.963 )~~( false )~~( Infinity )');
            
            assert.deepEqual(chainMaker.reverseChain().addLink('DEF').reverseChain().reverseChain().reverseChain().addLink(333).addLink(null).addLink(0).reverseChain().reverseChain().finishChain(), '( DEF )~~( 333 )~~( null )~~( 0 )');
            
            assert.deepEqual(chainMaker.addLink('DEF').reverseChain().addLink('8.963').reverseChain().reverseChain().reverseChain().addLink(3.14).reverseChain().reverseChain().reverseChain().finishChain(), '( 3.14 )~~( DEF )~~( 8.963 )');
            
            assert.deepEqual(chainMaker.reverseChain().reverseChain().addLink(false).addLink(true).reverseChain().addLink(null).addLink(0).addLink(3.14).addLink('8.963').addLink('GHI').finishChain(), '( true )~~( false )~~( null )~~( 0 )~~( 3.14 )~~( 8.963 )~~( GHI )');
            
            assert.deepEqual(chainMaker.addLink(1.233).addLink('ABC').addLink('GHI').reverseChain().addLink(NaN).addLink(false).addLink('ABC').reverseChain().reverseChain().reverseChain().finishChain(), '( ABC )~~( false )~~( NaN )~~( 1.233 )~~( ABC )~~( GHI )');
            
            assert.deepEqual(chainMaker.reverseChain().addLink('GHI').reverseChain().reverseChain().reverseChain().addLink('DEF').addLink(Infinity).reverseChain().addLink(Infinity).reverseChain().finishChain(), '( Infinity )~~( GHI )~~( DEF )~~( Infinity )');
            
            assert.deepEqual(chainMaker.addLink(333).reverseChain().addLink(NaN).reverseChain().addLink(0).reverseChain().addLink('ABC').reverseChain().addLink(1.233).addLink(null).finishChain(), '( ABC )~~( NaN )~~( 333 )~~( 0 )~~( 1.233 )~~( null )');
            
            assert.deepEqual(chainMaker.reverseChain().addLink(false).reverseChain().reverseChain().addLink(Infinity).addLink(NaN).reverseChain().addLink(22).reverseChain().reverseChain().finishChain(), '( NaN )~~( Infinity )~~( false )~~( 22 )');
            
            assert.deepEqual(chainMaker.addLink('DEF').addLink(22).addLink('ABC').addLink(3.14).addLink(333).addLink('8.963').addLink(0).addLink(1.233).addLink(NaN).reverseChain().finishChain(), '( NaN )~~( 1.233 )~~( 0 )~~( 8.963 )~~( 333 )~~( 3.14 )~~( ABC )~~( 22 )~~( DEF )');
            
            assert.deepEqual(chainMaker.reverseChain().addLink(null).addLink(false).addLink({ 0: 'first', 1: 'second', 'length': 2 }).reverseChain().addLink(1).reverseChain().reverseChain().addLink({ 0: 'first', 1: 'second', 'length': 2 }).reverseChain().finishChain(), '( [object Object] )~~( 1 )~~( null )~~( false )~~( [object Object] )');
            
            assert.deepEqual(chainMaker.addLink('DEF').reverseChain().reverseChain().reverseChain().reverseChain().reverseChain().reverseChain().addLink({ 0: 'first', 1: 'second', 'length': 2 }).addLink(3.14).addLink('DEF').finishChain(), '( DEF )~~( [object Object] )~~( 3.14 )~~( DEF )');
            
            assert.deepEqual(chainMaker.addLink('DEF').addLink(1.233).reverseChain().addLink({ 0: 'first', 1: 'second', 'length': 2 }).addLink(1).reverseChain().addLink(NaN).reverseChain().addLink({ 0: 'first', 1: 'second', 'length': 2 }).reverseChain().finishChain(), '( [object Object] )~~( 1 )~~( [object Object] )~~( DEF )~~( 1.233 )~~( NaN )');
            
            assert.deepEqual(chainMaker.addLink(null).reverseChain().addLink(1).addLink({ 0: 'first', 1: 'second', 'length': 2 }).reverseChain().addLink(22).addLink(3.14).reverseChain().reverseChain().reverseChain().finishChain(), '( 3.14 )~~( 22 )~~( null )~~( 1 )~~( [object Object] )');
            
            assert.deepEqual(chainMaker.reverseChain().reverseChain().addLink({ 0: 'first', 1: 'second', 'length': 2 }).reverseChain().addLink({ 0: 'first', 1: 'second', 'length': 2 }).reverseChain().addLink(NaN).reverseChain().reverseChain().reverseChain().finishChain(), '( NaN )~~( [object Object] )~~( [object Object] )');
            
            assert.deepEqual(chainMaker.addLink(1).addLink('DEF').addLink(1.233).addLink(0).reverseChain().reverseChain().reverseChain().reverseChain().addLink(NaN).reverseChain().finishChain(), '( NaN )~~( 0 )~~( 1.233 )~~( DEF )~~( 1 )');
            
            assert.deepEqual(chainMaker.addLink('8.963').addLink('GHI').reverseChain().addLink({ 0: 'first', 1: 'second', 'length': 2 }).reverseChain().reverseChain().addLink(NaN).reverseChain().addLink(1.233).addLink(333).finishChain(), '( NaN )~~( [object Object] )~~( 8.963 )~~( GHI )~~( 1.233 )~~( 333 )');
            assert.deepEqual(chainMaker.addLink(true).addLink({ 0: 'first', 1: 'second', 'length': 2 }).addLink(false).reverseChain().addLink(Infinity).addLink(1.233).reverseChain().addLink(3.14).reverseChain().addLink('GHI').finishChain(), '( 3.14 )~~( false )~~( [object Object] )~~( true )~~( Infinity )~~( 1.233 )~~( GHI )');
            assert.deepEqual(chainMaker.reverseChain().addLink('GHI').addLink(NaN).reverseChain().reverseChain().addLink(false).addLink(3.14).reverseChain().reverseChain().addLink(333).finishChain(), '( GHI )~~( NaN )~~( false )~~( 3.14 )~~( 333 )');
            assert.deepEqual(chainMaker.addLink(null).reverseChain().reverseChain().reverseChain().reverseChain().addLink('DEF').reverseChain().addLink('DEF').addLink(Infinity).addLink('8.963').finishChain(), '( DEF )~~( null )~~( DEF )~~( Infinity )~~( 8.963 )');
            assert.deepEqual(chainMaker.reverseChain().addLink('DEF').reverseChain().reverseChain().reverseChain().reverseChain().addLink(0).reverseChain().addLink(Infinity).addLink(Infinity).finishChain(), '( 0 )~~( DEF )~~( Infinity )~~( Infinity )');
            assert.deepEqual(chainMaker.addLink(null).reverseChain().addLink(1.233).reverseChain().addLink(NaN).reverseChain().reverseChain().reverseChain().reverseChain().reverseChain().finishChain(), '( NaN )~~( null )~~( 1.233 )');
            assert.deepEqual(chainMaker.addLink({ 0: 'first', 1: 'second', 'length': 2 }).reverseChain().reverseChain().reverseChain().addLink(1).addLink(null).reverseChain().reverseChain().addLink(22).reverseChain().finishChain(), '( 22 )~~( null )~~( 1 )~~( [object Object] )');
            assert.deepEqual(chainMaker.addLink(0).reverseChain().addLink('DEF').addLink(1).addLink(1).reverseChain().reverseChain().addLink(1.233).reverseChain().reverseChain().finishChain(), '( 0 )~~( DEF )~~( 1 )~~( 1 )~~( 1.233 )');
            assert.deepEqual(chainMaker.reverseChain().reverseChain().addLink({ 0: 'first', 1: 'second', 'length': 2 }).reverseChain().reverseChain().addLink({ 0: 'first', 1: 'second', 'length': 2 }).reverseChain().addLink(1).addLink('8.963').addLink({ 0: 'first', 1: 'second', 'length': 2 }).finishChain(), '( [object Object] )~~( [object Object] )~~( 1 )~~( 8.963 )~~( [object Object] )');
            assert.deepEqual(chainMaker.addLink(22).reverseChain().addLink(NaN).reverseChain().addLink(3.14).reverseChain().reverseChain().addLink(null).reverseChain().addLink(NaN).finishChain(), '( null )~~( 3.14 )~~( 22 )~~( NaN )~~( NaN )');
            assert.deepEqual(chainMaker.addLink(0).reverseChain().reverseChain().addLink(false).addLink('GHI').addLink(true).reverseChain().reverseChain().reverseChain().addLink(1.233).finishChain(), '( true )~~( GHI )~~( false )~~( 0 )~~( 1.233 )');
            assert.deepEqual(chainMaker.addLink({ 0: 'first', 1: 'second', 'length': 2 }).addLink('GHI').reverseChain().addLink(true).reverseChain().reverseChain().reverseChain().addLink(1.233).reverseChain().reverseChain().finishChain(), '( true )~~( [object Object] )~~( GHI )~~( 1.233 )');
            assert.deepEqual(chainMaker.addLink(1).reverseChain().reverseChain().addLink(3.14).reverseChain().reverseChain().addLink('ABC').addLink({ 0: 'first', 1: 'second', 'length': 2 }).reverseChain().addLink(3.14).finishChain(), '( [object Object] )~~( ABC )~~( 3.14 )~~( 1 )~~( 3.14 )');
            assert.deepEqual(chainMaker.reverseChain().addLink(1.233).addLink(22).addLink('DEF').reverseChain().addLink(1.233).addLink(333).addLink(true).addLink(1).addLink(333).finishChain(), '( DEF )~~( 22 )~~( 1.233 )~~( 1.233 )~~( 333 )~~( true )~~( 1 )~~( 333 )');
            assert.deepEqual(chainMaker.reverseChain().reverseChain().addLink({ 0: 'first', 1: 'second', 'length': 2 }).reverseChain().addLink(0).addLink('GHI').reverseChain().reverseChain().addLink(Infinity).addLink('8.963').finishChain(), '( [object Object] )~~( 0 )~~( GHI )~~( Infinity )~~( 8.963 )');
            assert.deepEqual(chainMaker.addLink(3.14).addLink(Infinity).addLink(Infinity).addLink(333).reverseChain().reverseChain().reverseChain().addLink(null).reverseChain().addLink(22).finishChain(), '( null )~~( 3.14 )~~( Infinity )~~( Infinity )~~( 333 )~~( 22 )');
            assert.deepEqual(chainMaker.reverseChain().addLink('GHI').reverseChain().addLink(true).addLink(false).addLink(null).addLink('DEF').reverseChain().reverseChain().reverseChain().finishChain(), '( DEF )~~( null )~~( false )~~( true )~~( GHI )');
            assert.deepEqual(chainMaker.addLink(3.14).addLink(1).addLink({ 0: 'first', 1: 'second', 'length': 2 }).addLink('DEF').addLink({ 0: 'first', 1: 'second', 'length': 2 }).addLink(true).addLink(false).addLink(333).reverseChain().reverseChain().finishChain(), '( 3.14 )~~( 1 )~~( [object Object] )~~( DEF )~~( [object Object] )~~( true )~~( false )~~( 333 )');
            assert.deepEqual(chainMaker.reverseChain().addLink(NaN).reverseChain().addLink(null).reverseChain().reverseChain().addLink(NaN).addLink('8.963').addLink(333).addLink(333).finishChain(), '( NaN )~~( null )~~( NaN )~~( 8.963 )~~( 333 )~~( 333 )');
            assert.deepEqual(chainMaker.addLink('GHI').reverseChain().reverseChain().addLink('8.963').addLink(false).addLink(NaN).reverseChain().addLink(22).addLink('GHI').addLink(false).finishChain(), '( NaN )~~( false )~~( 8.963 )~~( GHI )~~( 22 )~~( GHI )~~( false )');
            assert.deepEqual(chainMaker.addLink(22).addLink('ABC').reverseChain().reverseChain().addLink(NaN).reverseChain().addLink(333).addLink(22).addLink('GHI').addLink(Infinity).finishChain(), '( NaN )~~( ABC )~~( 22 )~~( 333 )~~( 22 )~~( GHI )~~( Infinity )');
            assert.deepEqual(chainMaker.addLink({ 0: 'first', 1: 'second', 'length': 2 }).addLink(22).addLink(NaN).addLink('8.963').addLink(1.233).addLink(NaN).reverseChain().addLink('ABC').reverseChain().addLink(3.14).finishChain(), '( ABC )~~( [object Object] )~~( 22 )~~( NaN )~~( 8.963 )~~( 1.233 )~~( NaN )~~( 3.14 )');
            assert.deepEqual(chainMaker.addLink(333).reverseChain().reverseChain().addLink('ABC').addLink('8.963').reverseChain().addLink({ 0: 'first', 1: 'second', 'length': 2 }).reverseChain().addLink(false).addLink('ABC').finishChain(), '( [object Object] )~~( 333 )~~( ABC )~~( 8.963 )~~( false )~~( ABC )');
            assert.deepEqual(chainMaker.reverseChain().reverseChain().addLink(false).reverseChain().reverseChain().reverseChain().reverseChain().reverseChain().addLink(null).reverseChain().finishChain(), '( null )~~( false )');
            assert.deepEqual(chainMaker.reverseChain().reverseChain().reverseChain().addLink(0).addLink({ 0: 'first', 1: 'second', 'length': 2 }).reverseChain().reverseChain().addLink(true).addLink(NaN).reverseChain().finishChain(), '( NaN )~~( true )~~( [object Object] )~~( 0 )');
            assert.deepEqual(chainMaker.reverseChain().addLink('ABC').reverseChain().addLink(NaN).addLink(false).reverseChain().addLink('ABC').addLink(false).reverseChain().addLink(1.233).finishChain(), '( false )~~( ABC )~~( ABC )~~( NaN )~~( false )~~( 1.233 )');
            assert.deepEqual(chainMaker.addLink(0).addLink(22).addLink('ABC').reverseChain().reverseChain().addLink(Infinity).reverseChain().addLink('8.963').addLink(0).addLink('ABC').finishChain(), '( Infinity )~~( ABC )~~( 22 )~~( 0 )~~( 8.963 )~~( 0 )~~( ABC )');
            assert.deepEqual(chainMaker.addLink(true).reverseChain().addLink(Infinity).addLink(333).addLink(1).addLink(NaN).addLink(1.233).reverseChain().addLink(22).reverseChain().finishChain(), '( 22 )~~( true )~~( Infinity )~~( 333 )~~( 1 )~~( NaN )~~( 1.233 )');
            assert.deepEqual(chainMaker.reverseChain().addLink('8.963').reverseChain().reverseChain().reverseChain().reverseChain().reverseChain().reverseChain().addLink({ 0: 'first', 1: 'second', 'length': 2 }).reverseChain().finishChain(), '( [object Object] )~~( 8.963 )');
            assert.deepEqual(chainMaker.addLink('ABC').reverseChain().reverseChain().addLink('DEF').addLink({ 0: 'first', 1: 'second', 'length': 2 }).reverseChain().addLink(1.233).addLink(1.233).reverseChain().addLink('ABC').finishChain(), '( 1.233 )~~( 1.233 )~~( ABC )~~( DEF )~~( [object Object] )~~( ABC )');
            assert.deepEqual(chainMaker.reverseChain().reverseChain().reverseChain().addLink(0).reverseChain().addLink('DEF').reverseChain().reverseChain().addLink({ 0: 'first', 1: 'second', 'length': 2 }).addLink(1).finishChain(), '( 0 )~~( DEF )~~( [object Object] )~~( 1 )');
            assert.deepEqual(chainMaker.addLink(1).reverseChain().reverseChain().addLink({ 0: 'first', 1: 'second', 'length': 2 }).addLink(false).reverseChain().reverseChain().reverseChain().addLink('GHI').reverseChain().finishChain(), '( GHI )~~( 1 )~~( [object Object] )~~( false )');
            assert.deepEqual(chainMaker.reverseChain().reverseChain().addLink('DEF').addLink(333).addLink({ 0: 'first', 1: 'second', 'length': 2 }).reverseChain().reverseChain().reverseChain().reverseChain().reverseChain().finishChain(), '( [object Object] )~~( 333 )~~( DEF )');
            assert.deepEqual(chainMaker.reverseChain().addLink(333).reverseChain().addLink(Infinity).addLink({ 0: 'first', 1: 'second', 'length': 2 }).reverseChain().addLink(true).addLink(true).addLink(22).addLink(333).finishChain(), '( [object Object] )~~( Infinity )~~( 333 )~~( true )~~( true )~~( 22 )~~( 333 )');
            assert.deepEqual(chainMaker.addLink(NaN).reverseChain().addLink(333).addLink(NaN).reverseChain().reverseChain().reverseChain().reverseChain().reverseChain().addLink(null).finishChain(), '( NaN )~~( 333 )~~( NaN )~~( null )');
            assert.deepEqual(chainMaker.addLink(22).reverseChain().reverseChain().reverseChain().reverseChain().addLink(NaN).reverseChain().reverseChain().reverseChain().reverseChain().finishChain(), '( 22 )~~( NaN )');
            assert.deepEqual(chainMaker.addLink(null).addLink(false).addLink(22).reverseChain().reverseChain().reverseChain().reverseChain().addLink({ 0: 'first', 1: 'second', 'length': 2 }).reverseChain().addLink('DEF').finishChain(), '( [object Object] )~~( 22 )~~( false )~~( null )~~( DEF )');
            assert.deepEqual(chainMaker.reverseChain().reverseChain().reverseChain().addLink('GHI').reverseChain().addLink(false).addLink('8.963').addLink(1.233).addLink('8.963').reverseChain().finishChain(), '( 8.963 )~~( 1.233 )~~( 8.963 )~~( false )~~( GHI )');
            assert.deepEqual(chainMaker.addLink(1.233).addLink({ 0: 'first', 1: 'second', 'length': 2 }).reverseChain().reverseChain().addLink('8.963').reverseChain().reverseChain().addLink({ 0: 'first', 1: 'second', 'length': 2 }).addLink(3.14).reverseChain().finishChain(), '( 3.14 )~~( [object Object] )~~( 8.963 )~~( [object Object] )~~( 1.233 )');
            assert.deepEqual(chainMaker.reverseChain().addLink(3.14).reverseChain().reverseChain().reverseChain().reverseChain().reverseChain().reverseChain().addLink(1).addLink(0).finishChain(), '( 3.14 )~~( 1 )~~( 0 )');
            assert.deepEqual(chainMaker.reverseChain().addLink(333).addLink({ 0: 'first', 1: 'second', 'length': 2 }).reverseChain().addLink(333).reverseChain().addLink({ 0: 'first', 1: 'second', 'length': 2 }).addLink(Infinity).reverseChain().reverseChain().finishChain(), '( 333 )~~( 333 )~~( [object Object] )~~( [object Object] )~~( Infinity )');
            assert.deepEqual(chainMaker.reverseChain().addLink(1.233).addLink(22).reverseChain().reverseChain().reverseChain().reverseChain().reverseChain().addLink(22).reverseChain().finishChain(), '( 22 )~~( 1.233 )~~( 22 )');
            assert.deepEqual(chainMaker.addLink(NaN).addLink(1.233).reverseChain().addLink(Infinity).addLink(NaN).reverseChain().reverseChain().reverseChain().addLink(333).addLink('ABC').finishChain(), '( NaN )~~( Infinity )~~( NaN )~~( 1.233 )~~( 333 )~~( ABC )');
            assert.deepEqual(chainMaker.addLink(22).reverseChain().addLink({ 0: 'first', 1: 'second', 'length': 2 }).addLink('ABC').reverseChain().addLink(0).addLink('ABC').reverseChain().addLink('8.963').addLink({ 0: 'first', 1: 'second', 'length': 2 }).finishChain(), '( ABC )~~( 0 )~~( 22 )~~( [object Object] )~~( ABC )~~( 8.963 )~~( [object Object] )');
            assert.deepEqual(chainMaker.reverseChain().addLink(1).addLink({ 0: 'first', 1: 'second', 'length': 2 }).addLink(Infinity).reverseChain().reverseChain().reverseChain().reverseChain().reverseChain().reverseChain().finishChain(), '( 1 )~~( [object Object] )~~( Infinity )');
            assert.deepEqual(chainMaker.reverseChain().reverseChain().addLink(Infinity).reverseChain().addLink(3.14).addLink(null).addLink(false).addLink(1).addLink(NaN).reverseChain().finishChain(), '( NaN )~~( 1 )~~( false )~~( null )~~( 3.14 )~~( Infinity )');
            assert.deepEqual(chainMaker.reverseChain().addLink(333).reverseChain().reverseChain().addLink(333).reverseChain().addLink({ 0: 'first', 1: 'second', 'length': 2 }).addLink(null).reverseChain().reverseChain().finishChain(), '( 333 )~~( 333 )~~( [object Object] )~~( null )');
            assert.deepEqual(chainMaker.reverseChain().reverseChain().reverseChain().addLink(333).reverseChain().addLink(22).addLink({ 0: 'first', 1: 'second', 'length': 2 }).reverseChain().addLink({ 0: 'first', 1: 'second', 'length': 2 }).addLink('DEF').finishChain(), '( [object Object] )~~( 22 )~~( 333 )~~( [object Object] )~~( DEF )');
            assert.deepEqual(chainMaker.addLink(1.233).addLink(333).reverseChain().reverseChain().reverseChain().reverseChain().addLink('GHI').reverseChain().addLink({ 0: 'first', 1: 'second', 'length': 2 }).addLink(null).finishChain(), '( GHI )~~( 333 )~~( 1.233 )~~( [object Object] )~~( null )');
            assert.deepEqual(chainMaker.reverseChain().addLink({ 0: 'first', 1: 'second', 'length': 2 }).reverseChain().addLink(0).addLink(true).addLink(false).reverseChain().addLink('DEF').reverseChain().addLink(1).finishChain(), '( DEF )~~( [object Object] )~~( 0 )~~( true )~~( false )~~( 1 )');
            assert.deepEqual(chainMaker.addLink(null).reverseChain().addLink('ABC').reverseChain().reverseChain().addLink({ 0: 'first', 1: 'second', 'length': 2 }).reverseChain().reverseChain().reverseChain().addLink(true).finishChain(), '( [object Object] )~~( ABC )~~( null )~~( true )');
            assert.deepEqual(chainMaker.addLink('DEF').addLink(0).reverseChain().addLink(true).addLink({ 0: 'first', 1: 'second', 'length': 2 }).addLink(1).addLink({ 0: 'first', 1: 'second', 'length': 2 }).addLink(Infinity).addLink(22).addLink(1.233).finishChain(), '( 0 )~~( DEF )~~( true )~~( [object Object] )~~( 1 )~~( [object Object] )~~( Infinity )~~( 22 )~~( 1.233 )');
            assert.deepEqual(chainMaker.reverseChain().addLink('ABC').reverseChain().reverseChain().reverseChain().addLink(Infinity).addLink(false).addLink(0).addLink('8.963').reverseChain().finishChain(), '( 8.963 )~~( 0 )~~( false )~~( Infinity )~~( ABC )');
            assert.deepEqual(chainMaker.reverseChain().reverseChain().reverseChain().addLink(1.233).addLink('DEF').addLink(true).addLink('DEF').reverseChain().reverseChain().addLink(NaN).finishChain(), '( 1.233 )~~( DEF )~~( true )~~( DEF )~~( NaN )');
            assert.deepEqual(chainMaker.addLink(null).reverseChain().reverseChain().addLink(null).reverseChain().reverseChain().reverseChain().addLink(1).reverseChain().addLink(null).finishChain(), '( 1 )~~( null )~~( null )~~( null )');
            assert.deepEqual(chainMaker.addLink(Infinity).reverseChain().addLink(false).reverseChain().addLink(NaN).reverseChain().reverseChain().reverseChain().reverseChain().addLink(333).finishChain(), '( false )~~( Infinity )~~( NaN )~~( 333 )');
            assert.deepEqual(chainMaker.addLink(0).addLink(1.233).addLink('GHI').addLink(0).addLink(333).addLink('DEF').addLink(NaN).reverseChain().addLink(true).addLink(3.14).finishChain(), '( NaN )~~( DEF )~~( 333 )~~( 0 )~~( GHI )~~( 1.233 )~~( 0 )~~( true )~~( 3.14 )');
            assert.deepEqual(chainMaker.reverseChain().reverseChain().reverseChain().addLink('ABC').reverseChain().addLink('GHI').reverseChain().addLink(Infinity).reverseChain().addLink(22).finishChain(), '( Infinity )~~( ABC )~~( GHI )~~( 22 )');
            assert.deepEqual(chainMaker.addLink('ABC').reverseChain().addLink(NaN).addLink('DEF').reverseChain().reverseChain().addLink(NaN).reverseChain().addLink(false).addLink('GHI').finishChain(), '( NaN )~~( DEF )~~( NaN )~~( ABC )~~( false )~~( GHI )');
            assert.deepEqual(chainMaker.reverseChain().reverseChain().reverseChain().reverseChain().addLink({ 0: 'first', 1: 'second', 'length': 2 }).addLink({ 0: 'first', 1: 'second', 'length': 2 }).reverseChain().addLink(NaN).reverseChain().reverseChain().finishChain(), '( [object Object] )~~( [object Object] )~~( NaN )');
            assert.deepEqual(chainMaker.addLink({ 0: 'first', 1: 'second', 'length': 2 }).addLink(22).addLink({ 0: 'first', 1: 'second', 'length': 2 }).reverseChain().reverseChain().addLink(333).reverseChain().addLink(null).reverseChain().addLink(null).finishChain(), '( null )~~( [object Object] )~~( 22 )~~( [object Object] )~~( 333 )~~( null )');
            assert.deepEqual(chainMaker.reverseChain().addLink(3.14).addLink({ 0: 'first', 1: 'second', 'length': 2 }).addLink('DEF').addLink('DEF').addLink('GHI').reverseChain().addLink('ABC').reverseChain().addLink(0).finishChain(), '( ABC )~~( 3.14 )~~( [object Object] )~~( DEF )~~( DEF )~~( GHI )~~( 0 )');
            assert.deepEqual(chainMaker.addLink('DEF').addLink({ 0: 'first', 1: 'second', 'length': 2 }).reverseChain().addLink(0).addLink(false).addLink({ 0: 'first', 1: 'second', 'length': 2 }).addLink({ 0: 'first', 1: 'second', 'length': 2 }).reverseChain().reverseChain().reverseChain().finishChain(), '( [object Object] )~~( [object Object] )~~( false )~~( 0 )~~( DEF )~~( [object Object] )');
            assert.deepEqual(chainMaker.reverseChain().addLink({ 0: 'first', 1: 'second', 'length': 2 }).addLink({ 0: 'first', 1: 'second', 'length': 2 }).addLink(false).reverseChain().reverseChain().reverseChain().addLink(333).addLink(1).reverseChain().finishChain(), '( 1 )~~( 333 )~~( [object Object] )~~( [object Object] )~~( false )');
            assert.deepEqual(chainMaker.reverseChain().reverseChain().addLink(1).addLink(22).reverseChain().addLink(true).reverseChain().addLink(333).reverseChain().reverseChain().finishChain(), '( true )~~( 1 )~~( 22 )~~( 333 )');
            assert.deepEqual(chainMaker.reverseChain().addLink(3.14).reverseChain().reverseChain().addLink('8.963').addLink(22).reverseChain().reverseChain().reverseChain().addLink(true).finishChain(), '( 22 )~~( 8.963 )~~( 3.14 )~~( true )');
            assert.deepEqual(chainMaker.reverseChain().reverseChain().addLink(false).addLink(333).addLink('GHI').addLink(333).reverseChain().reverseChain().addLink(false).reverseChain().finishChain(), '( false )~~( 333 )~~( GHI )~~( 333 )~~( false )');
            assert.deepEqual(chainMaker.addLink(1).reverseChain().reverseChain().reverseChain().addLink(22).reverseChain().addLink(1.233).addLink(true).reverseChain().addLink(1.233).finishChain(), '( true )~~( 1.233 )~~( 1 )~~( 22 )~~( 1.233 )');
            assert.deepEqual(chainMaker.reverseChain().reverseChain().addLink(3.14).addLink(3.14).addLink('DEF').addLink('ABC').addLink('8.963').reverseChain().reverseChain().reverseChain().finishChain(), '( 8.963 )~~( ABC )~~( DEF )~~( 3.14 )~~( 3.14 )');
            assert.deepEqual(chainMaker.reverseChain().reverseChain().reverseChain().addLink(NaN).reverseChain().addLink(null).addLink(1.233).addLink(true).addLink(false).addLink(1.233).finishChain(), '( NaN )~~( null )~~( 1.233 )~~( true )~~( false )~~( 1.233 )');
            assert.deepEqual(chainMaker.reverseChain().addLink(Infinity).addLink('DEF').addLink(22).addLink(NaN).reverseChain().addLink('DEF').addLink(Infinity).addLink(1.233).addLink({ 0: 'first', 1: 'second', 'length': 2 }).finishChain(), '( NaN )~~( 22 )~~( DEF )~~( Infinity )~~( DEF )~~( Infinity )~~( 1.233 )~~( [object Object] )');
            assert.deepEqual(chainMaker.reverseChain().reverseChain().reverseChain().addLink(1.233).reverseChain().addLink(true).addLink(null).reverseChain().addLink('DEF').addLink(false).finishChain(), '( null )~~( true )~~( 1.233 )~~( DEF )~~( false )');
            assert.deepEqual(chainMaker.reverseChain().reverseChain().reverseChain().addLink(true).reverseChain().reverseChain().reverseChain().reverseChain().reverseChain().reverseChain().finishChain(), '( true )');
            assert.deepEqual(chainMaker.addLink(Infinity).reverseChain().addLink(true).reverseChain().addLink(Infinity).addLink({ 0: 'first', 1: 'second', 'length': 2 }).addLink(null).reverseChain().addLink(Infinity).addLink('8.963').finishChain(), '( null )~~( [object Object] )~~( Infinity )~~( Infinity )~~( true )~~( Infinity )~~( 8.963 )');
            assert.deepEqual(chainMaker.reverseChain().reverseChain().addLink(0).addLink(true).reverseChain().addLink('ABC').reverseChain().reverseChain().reverseChain().reverseChain().finishChain(), '( true )~~( 0 )~~( ABC )');
            assert.deepEqual(chainMaker.addLink(false).addLink(null).addLink(true).reverseChain().reverseChain().addLink(1.233).reverseChain().reverseChain().addLink(333).reverseChain().finishChain(), '( 333 )~~( 1.233 )~~( true )~~( null )~~( false )');
            assert.deepEqual(chainMaker.addLink({ 0: 'first', 1: 'second', 'length': 2 }).reverseChain().reverseChain().addLink(true).addLink(Infinity).reverseChain().reverseChain().reverseChain().addLink('8.963').reverseChain().finishChain(), '( 8.963 )~~( [object Object] )~~( true )~~( Infinity )');
            assert.deepEqual(chainMaker.reverseChain().reverseChain().addLink('DEF').addLink(NaN).reverseChain().addLink(333).reverseChain().addLink('GHI').addLink('ABC').addLink({ 0: 'first', 1: 'second', 'length': 2 }).finishChain(), '( 333 )~~( DEF )~~( NaN )~~( GHI )~~( ABC )~~( [object Object] )');
        });
        it.optional('removeLinks works correctly', () => {
            assert.deepEqual(chainMaker.reverseChain().reverseChain().reverseChain().addLink(NaN).reverseChain().addLink(null).addLink(1.233).addLink(true).addLink(false).removeLink(3).addLink(1.233).finishChain(), '( NaN )~~( null )~~( true )~~( false )~~( 1.233 )');
            
            assert.deepEqual(chainMaker.reverseChain().addLink('ABC').reverseChain().reverseChain().reverseChain().addLink(Infinity).addLink(false).addLink(0).addLink('8.963').removeLink(2).removeLink(1).reverseChain().finishChain(), '( 8.963 )~~( 0 )~~( false )');
            
            assert.deepEqual(chainMaker.addLink(null).addLink(false).addLink(22).reverseChain().reverseChain().removeLink(2).reverseChain().reverseChain().addLink({ 0: 'first', 1: 'second', 'length': 2 }).reverseChain().addLink('DEF').finishChain(), '( [object Object] )~~( 22 )~~( null )~~( DEF )');
            assert.deepEqual(chainMaker.addLink(3.14).addLink(1).addLink({ 0: 'first', 1: 'second', 'length': 2 }).removeLink(1).addLink('DEF').addLink({ 0: 'first', 1: 'second', 'length': 2 }).removeLink(1).addLink(true).addLink(false).addLink(333).reverseChain().reverseChain().finishChain(), '( [object Object] )~~( DEF )~~( [object Object] )~~( true )~~( false )~~( 333 )');
            assert.deepEqual(chainMaker.addLink('ABC').reverseChain().reverseChain().addLink('DEF').removeLink(1).addLink({ 0: 'first', 1: 'second', 'length': 2 }).reverseChain().addLink(1.233).addLink(1.233).reverseChain().addLink('ABC').finishChain(), '( 1.233 )~~( 1.233 )~~( DEF )~~( [object Object] )~~( ABC )');
        });
    });
});