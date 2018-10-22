const { test } = require('ava')
const usbDevices = require('../lib')

test('Get usb devices', async t => {
    const devices = await usbDevices.getDevices()
    t.true(Array.isArray(devices))
})

test('Find by bus number', async t => {
    const expectedDevice = (await usbDevices.getDevices()).find(
        ({ busNumber }) => busNumber === 1
    )

    const device = await usbDevices.findByBusNumber(1)

    t.deepEqual(expectedDevice, device)
})

test('Get devices on a specific address', async t => {
    const expectedDevice = (await usbDevices.getDevices()).filter(
        device => device.address === 2
    )
    const device = await usbDevices.onAddress(2)
    t.deepEqual(expectedDevice, device)
})

test('Get devices that support a specific usb version', async t => {
    const expectedDevices = (await usbDevices.getDevices()).filter(
        ({
            deviceDescriptor: {
                supportedUsbVersion: { majorVersion, minorVersion },
            },
        }) => majorVersion <= 2 && minorVersion >= 2
    )

    const devices = await usbDevices.support(2)
    t.deepEqual(devices, expectedDevices)
})
