import { Address, BigInt  } from "@graphprotocol/graph-ts"
import {
    Approval as ApprovalEvent,
    ApprovalForAll as ApprovalForAllEvent,
    Transfer as TransferEvent
} from "../generated/ERC721Token/ERC721Token"
import {User, Approval, ApprovalForAll, Transfer} from "../generated/schema"
const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000"
const BigInt_ZERO = BigInt.fromI32(0)
export function handleApproval(event: ApprovalEvent): void {
    let entity = new Approval(
        event.transaction.hash.concatI32(event.logIndex.toI32())
    )
    entity.owner = event.params.owner
    entity.approved = event.params.approved
    entity.tokenId = event.params.tokenId

    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash

    entity.save()
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
    let entity = new ApprovalForAll(
        event.transaction.hash.concatI32(event.logIndex.toI32())
    )
    entity.owner = event.params.owner
    entity.operator = event.params.operator
    entity.approved = event.params.approved

    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash

    entity.save()
}

export function handleTransfer(event: TransferEvent): void {
    let entity = new Transfer(
        event.transaction.hash.concatI32(event.logIndex.toI32())
    )
    entity.from = event.params.from
    entity.to = event.params.to
    entity.tokenId = event.params.tokenId

    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash

    entity.save()

    updateUserTokenId(event.params.to, event.params.tokenId)
}

function updateUserTokenId(to: Address, tokenId: BigInt): void {
  if (to.toHex() != ADDRESS_ZERO) {
    let userTo = User.load(to.toHex())

    if (!userTo) {
      userTo = new User(to.toHex())
      userTo.tokenId = BigInt.fromI32(0)
    }

    userTo.tokenId = tokenId
    userTo.save()
  }
}
