const visit = require('unist-util-visit')
const is = require('hast-util-is-element')
const { extname } = require('path')

const { generateSrcsetWidths, generateImages } = require('../image')

const defaults = {
    basic: false,
}
const picture = (opts = {}) => {
    const options = {
        ...defaults,
        ...opts,
    }
    const promises = []
    return transformer

    async function transformer(tree) {
        visit(tree, 'element', visitor)
        await Promise.all(promises)
        return
    }

    function visitor(node, index, parent) {
        const supportedFileTypes = ['jpeg', 'jpg', 'png', 'webp', 'gif', 'tiff', 'avif', 'svg']
        const src = node.properties.src
        let sizes = options.basic ? '100vw' : '(min-width: 575) 50vw, 90vw'
        let sizesArray = options.basic ? [600] : [270, 325, 360, 480, 690, 810]
        let extension

        if (!parent || !is(node, 'img') || !src) {
            return
        }

        extension = extname(src).slice(1)

        if (!supportedFileTypes.includes(extension)) {
            return
        }

        if (!options.basic) {
            if (parent.properties.className?.includes('kg-width-full')) {
                sizes = '(min-width: 575) calc(100vw - 40px), calc(100vw - 10px)'
                sizesArray = [310, 365, 400, 728, 985, 1400, 1640]
            } else if (parent.properties.className?.includes('kg-width-wide')) {
                sizes = '(min-width: 575) 75vw, 92vw'
                sizesArray = [290, 345, 380, 540, 735, 1045, 1225]
            }
        }

        const srcsetSizes = options.basic ? sizesArray : generateSrcsetWidths(sizesArray)
        const promise = generateImages(node.properties.src, srcsetSizes).then(resized => parent.children[index] = {
            type: 'element',
            tagName: 'picture',
            properties: {},
            children: [
                ...sources(resized, sizes),
                fallbackImage(node, resized.jpeg[0]),
            ],
        }).catch((e) => {
            throw (e) 
        })
        promises.push(promise)
    }

    function sources(images, sizes) {
        const nodes = []
    
        Object.values(images).map((imageFormat) => {
            nodes.push({
                type: 'element',
                tagName: 'source',
                properties: {
                    type: imageFormat.sourceType,
                    srcSet: imageFormat.map(entry => entry.srcset).join(', '),
                    sizes,
                },  
                children: [],
            })
        })
        return nodes
    }

    function fallbackImage(originalNode, lowRes) {
        return {
            ...originalNode,
            properties: {
                className: [...originalNode.properties.className, 'image'],
                alt: originalNode.properties.alt,
                loading: 'lazy',
                width: lowRes.width,
                height: lowRes.height,
                src: lowRes.url,
            },
        }
    }
}

exports.picture = picture