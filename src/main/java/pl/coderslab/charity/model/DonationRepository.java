package pl.coderslab.charity.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DonationRepository extends JpaRepository<Donation, Long> {

    //CO jest bardziej obciążające bazę danych? Wyciąganie counta czy wyciągniecie listy i zwrócenie ilości elementów
    @Query("select count(d.id) from Donation d")
    Integer countDonationsById ();

    @Query("select sum(d.quantity) from Donation d")
    Integer countQuantity();

}
