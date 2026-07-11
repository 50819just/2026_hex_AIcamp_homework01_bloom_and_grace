import { readJsonFile } from './fileStore.js'

const MEMBERS_FILE = 'members.json'

export function readMembers() {
  return readJsonFile(MEMBERS_FILE, []).sort((leftMember, rightMember) => {
    const joinedAtDiff = new Date(rightMember.joinedAt).getTime() - new Date(leftMember.joinedAt).getTime()

    if (joinedAtDiff !== 0) {
      return joinedAtDiff
    }

    return leftMember.name.localeCompare(rightMember.name, 'zh-Hant')
  })
}
