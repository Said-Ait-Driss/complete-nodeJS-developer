//
//* ACID : ( guarantee data validity despite error )
    // A : atomicity
    // C : consistency
    // I : isolation
    // D : durability

/* *  atomicity :
 * a guarantee of atomicity prevents updates to the
 * database occurring only partially
 todo => atomicity is an atomic transaction either all occurs or nothing occurs
 * eg : there's no guarantee that combination of [update,delete] operations may successed
 * ( update or delete ) || Sql does (eg : transaction )
 */

/* *  durability :
 * eg : if a flight booking reports that a seat has been
 *   booked , then the seat will remain booked even if the
 *   system crashes
 */
