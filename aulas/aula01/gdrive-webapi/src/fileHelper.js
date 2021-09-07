import fs from 'fs'
import prettyBytes from 'pretty-bytes'

export default class FileHelper {
    static async getFilesStatus(downloadsFolder) {
        const currentFiles = await fs.promises.readdir(downloadsFolder)
        const statuses = await Promise
            .all(
                currentFiles
                    .map(
                        file => fs.promises.stat(`${downloadsFolder}/${file}`)
                    )
            )
        return currentFiles.map((fileName, fileIndex) => {
            const { birthtime, size } = statuses[fileIndex]
            return {
                size: prettyBytes(size),
                file: fileName,
                lastModified: birthtime,
                owner: process.env.USER
            }
        })
    }
}