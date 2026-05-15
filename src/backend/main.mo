import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Text "mo:core/Text";

actor {
  type WaitlistEntry = {
    email : Text;
    companyName : Text;
  };

  let waitlist = Map.empty<Text, WaitlistEntry>();

  public shared ({ caller }) func joinWaitlist(email : Text, companyName : Text) : async () {
    if (waitlist.containsKey(email)) {
      Runtime.trap("This email is already registered on the waitlist");
    };
    let entry : WaitlistEntry = {
      email;
      companyName;
    };
    waitlist.add(email, entry);
  };

  public query ({ caller }) func getWaitlistCount() : async Nat {
    waitlist.size();
  };

  public query ({ caller }) func getAllEntries() : async [WaitlistEntry] {
    waitlist.values().toArray();
  };
};
