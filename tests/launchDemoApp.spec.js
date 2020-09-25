const Application = require('spectron').Application
// const electronPath = require('electron');
const assert = require('assert')
const path = require('path')

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

chai.should()
chai.use(chaiAsPromised)

const sleep = (time) => new Promise((r) => setTimeout(r, time))

describe('Application', function () {
  describe('Launch', function () {
    const app = new Application({
      path: path.join(__dirname, '../dist/mac/DemoApp.app/Contents/MacOS/DemoApp'),
      // path: electronPath,
      // args: [path.join(__dirname, '..')],
    })

    before(() => app.start(), (chaiAsPromised.transferPromiseness = app.transferPromiseness))
    after(() => app.stop())

    it('opens a window', async () => {
      await app.client.waitUntilWindowLoaded(5000)
      const count = await app.client.getWindowCount()
      return assert.strictEqual(count, 1)
    })

    it('title should be present', async () => {
      let text = await app.client.getTitle()
      return assert.strictEqual(text, 'Your best Todo Application')
    })

    it('main contant should be present', async () => {
      await sleep(1000)
      await app.client.$('div.container').should.eventually.exist
      await app.client.$('div.nav-wrapper').should.eventually.exist
      await app.client.$('a.brand-logo').should.eventually.exist
    })

    it('Todo link should be present', async () => {
      let text = await (await app.client.$('//li/*[text()="Todo list"]')).getText()
      return assert.strictEqual(text, 'Todo list')
    })

    it('About link should be present', async () => {
      let text = await (await app.client.$('//li/*[text()="About"]')).getText()
      return assert.strictEqual(text, 'About')
    })

    it('should click on About link', async () => {
      await (await app.client.$('//li/*[text()="About"]')).click()
      await sleep(1000)
      const aboutTitle = await (await app.client.$('h1')).getText()
      return assert.strictEqual(aboutTitle, 'This is About Page')
    })

    it('should click on Go back button', async () => {
      const btnText = await (await app.client.$('button.btn')).getText()
      assert.strictEqual(btnText, 'GO BACK TO TODO LIST')
      await (await app.client.$('button.btn')).click()
      await sleep(1000)
      await app.client.$('div.input-field').should.eventually.exist
    })
  })
  describe('Add task', function () {
    const app = new Application({
      path: path.join(__dirname, '../dist/mac/DemoApp.app/Contents/MacOS/DemoApp'),
      // path: electronPath,
      // args: [path.join(__dirname, '..')],
    })

    before(() => app.start(), (chaiAsPromised.transferPromiseness = app.transferPromiseness))
    after(() => app.stop())

    it('opens a window', async () => {
      await app.client.waitUntilWindowLoaded(5000)
      const count = await app.client.getWindowCount()
      return assert.strictEqual(count, 1)
    })

    it('title should be present', async () => {
      let text = await app.client.getTitle()
      return assert.strictEqual(text, 'Your best Todo Application')
    })

    it('main contant should be present', async () => {
      await sleep(1000)
      await app.client.$('div.container').should.eventually.exist
      await app.client.$('div.nav-wrapper').should.eventually.exist
      await app.client.$('a.brand-logo').should.eventually.exist
    })

    it('Todo link should be present', async () => {
      let text = await (await app.client.$('//li/*[text()="Todo list"]')).getText()
      return assert.strictEqual(text, 'Todo list')
    })

    it('should click on Todo link', async () => {
      await (await app.client.$('//li/*[text()="Todo list"]')).click()
      await sleep(1000)
      await app.client.$('div.input-field').should.eventually.exist
    })

    it('Todo form should be present', async () => {
      await (await app.client.$('//label[text()="Enter your task"]')).isExisting()
      await (await app.client.$('input#title')).getValue().then((value) => {
        return assert.strictEqual(value, '')
      })
    })

    const newTask = 'Make more tests'

    it('add new task', async () => {
      await (await app.client.$('input#title')).setValue(newTask)
      await (await app.client.$('input#title')).getValue().then((value) => {
        return assert.strictEqual(value, newTask)
      })
      await (await app.client.$('input#title')).keys('Enter')
    })

    it('new task should be added to list', async () => {
      await (await app.client.$('input#title')).getValue().then((value) => {
        return assert.strictEqual(value, '')
      })
      await (await app.client.$('li.todo')).isExisting()
      const curentTaskText = await (await app.client.$('//li[@class="todo"]//span')).getText()
      return assert.strictEqual(curentTaskText, newTask)
    })
  })
})
