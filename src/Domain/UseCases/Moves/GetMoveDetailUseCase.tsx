import React from 'react'
import { MoveRepositoryImpl } from '../../../Data/Repositories/MoveRepository'

const { getMoveDetail } = new MoveRepositoryImpl()

export const GetMoveDetailUseCase = (moveId: string) => {
    return getMoveDetail(moveId)
}
