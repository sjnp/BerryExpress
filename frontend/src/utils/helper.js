const positionIdGenerator = (branchTypeId) => {
  // รับ คัดแยก - Return staff
  if (branchTypeId === 1) { return [2] }
  else if (branchTypeId === 2) { return [2] }

  // กระจาย - Return staff & postman
  else if (branchTypeId === 3) { return [2, 3] }

  // สนง ใหญ่ - Return admin
  else if (branchTypeId === 4) { return [1] }
}


const helper = {
  positionIdGenerator
}

export default helper